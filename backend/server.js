require('dotenv').config();
const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
const { body, validationResult, param } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("./db"); // Your db.js file

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}

// Middleware
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5179"], // Adjust to your frontend URLs
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.use(express.json()); // Instead of bodyParser

// --- Socket.IO Setup ---
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5179"], // Adjust as needed
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Socket.IO: A user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('Socket.IO: User disconnected', socket.id);
    });
    // Add more specific event listeners if needed (e.g., joining rooms)
});

// --- Authentication Middleware ---
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Attach decoded payload (e.g., { id: userId, role: userRole })
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// --- Authorization Middleware (Example) ---
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ error: 'Forbidden: Role information missing' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: `Forbidden: Role '${req.user.role}' not permitted` });
        }
        next();
    };
};


// --- Routes ---

// ** Authentication Routes **
// Student Signup
app.post('/api/students/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const [existing] = await db.query('SELECT id FROM students WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO students (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        res.status(201).json({ message: 'Student created successfully', userId: result.insertId });
    } catch (err) {
        console.error("Student Signup Error:", err);
        res.status(500).json({ error: 'Server error during student signup' });
    }
});

// Student Login
app.post('/api/students/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM students WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = users[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: 'student' }, jwtSecret, { expiresIn: '1d' }); // Adjust expiry
        res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email } }); // Send back some user info
    } catch (err) {
        console.error("Student Login Error:", err);
        res.status(500).json({ error: 'Server error during student login' });
    }
});

 // Employer Signup
 app.post('/api/employers/signup', [
     body('companyName').notEmpty(),
     body('contactName').notEmpty(),
     body('email').isEmail(),
     body('password').isLength({ min: 8 }),
 ], async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

     const { companyName, contactName, email, password } = req.body;
     try {
         const [existing] = await db.query('SELECT id FROM employers WHERE email = ?', [email]);
         if (existing.length > 0) return res.status(400).json({ error: 'Email already in use' });

         const hashedPassword = await bcrypt.hash(password, 10);
         const [result] = await db.query(
             'INSERT INTO employers (company_name, contact_name, email, password, approved) VALUES (?, ?, ?, ?, ?)',
             [companyName, contactName, email, hashedPassword, false] // Default to not approved
         );
         res.status(201).json({ message: 'Employer account created successfully, pending approval.', userId: result.insertId });
     } catch (err) {
         console.error("Employer Signup Error:", err);
         res.status(500).json({ error: 'Server error during employer signup' });
     }
 });

 // Employer Login
 app.post('/api/employers/login', [
     body('email').isEmail(),
     body('password').notEmpty(),
 ], async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

     const { email, password } = req.body;
     try {
         const [users] = await db.query('SELECT * FROM employers WHERE email = ?', [email]);
         if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

         const user = users[0];
         if (!user.approved) {
             return res.status(403).json({ error: 'Account not yet approved by admin.' });
         }

         const isValid = await bcrypt.compare(password, user.password);
         if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

         const token = jwt.sign({ id: user.id, role: 'employer' }, jwtSecret, { expiresIn: '1d' });
         // Exclude password from response
         const { password: _, ...userWithoutPassword } = user;
         res.json({ message: 'Login successful', token, user: userWithoutPassword });
     } catch (err) {
         console.error("Employer Login Error:", err);
         res.status(500).json({ error: 'Server error during employer login' });
     }
 });

// TODO: Add Admin Login/Signup routes similarly, assigning 'admin' or 'super_admin' roles in JWT

// ** Profile Routes **
// Get Logged-in Student Profile
app.get('/api/students/me', authenticate, authorize(['student']), async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, name, email, department, year, skills, cgpa FROM students WHERE id = ?', [req.user.id]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'Student profile not found' });
        }
        res.json(users[0]);
    } catch (err) {
        console.error("Get Student Profile Error:", err);
        res.status(500).json({ error: 'Server error fetching student profile' });
    }
});

// Update Logged-in Student Profile
app.put('/api/students/me', authenticate, authorize(['student']), [
    // Add validation rules for profile fields you allow updating
    body('name').optional().notEmpty(),
    body('department').optional().notEmpty(),
    body('year').optional().notEmpty(),
    body('skills').optional(),
    body('cgpa').optional().isDecimal(),
     // Add validation for other fields...
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Construct SET clause dynamically based on provided fields
    const fieldsToUpdate = {};
    const allowedFields = ['name', 'department', 'year', 'skills', 'cgpa' /* add other updatable fields */ ];
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            fieldsToUpdate[field] = req.body[field];
        }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
         return res.status(400).json({ error: "No valid fields provided for update." });
    }

    const setClause = Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(fieldsToUpdate), req.user.id];

    try {
        const [result] = await db.query(
            `UPDATE students SET ${setClause} WHERE id = ?`,
            values
        );
        if (result.affectedRows === 0) {
             return res.status(404).json({ error: 'Student profile not found or no changes made.' });
        }
        // Fetch updated profile to send back
         const [updatedUsers] = await db.query('SELECT id, name, email, department, year, skills, cgpa FROM students WHERE id = ?', [req.user.id]);
        res.json({ message: 'Profile updated successfully', user: updatedUsers[0] });
    } catch (err) {
        console.error("Update Student Profile Error:", err);
        res.status(500).json({ error: 'Server error updating student profile' });
    }
});

 // TODO: Add Get/Update Employer Profile routes similarly

// ** Internship Routes **
// Get All Internships (or filter)
app.get('/api/internships', authenticate, async (req, res) => { // Require auth to view
    try {
        // Add filtering/pagination later if needed
         let query = 'SELECT i.*, e.company_name FROM internships i JOIN employers e ON i.employer_id = e.id WHERE i.status = ?';
         const params = ['active']; // Default to active, admins might see 'pending_review'

         // Allow filtering by employer if requested (e.g., for employer dashboard)
         if (req.user.role === 'employer' && req.query.employerId === String(req.user.id)) {
             query = 'SELECT i.*, e.company_name FROM internships i JOIN employers e ON i.employer_id = e.id WHERE i.employer_id = ?';
             params.push(req.user.id);
         } else if (req.user.role === 'admin' || req.user.role === 'super_admin') {
              query = 'SELECT i.*, e.company_name FROM internships i JOIN employers e ON i.employer_id = e.id'; // Admins see all
              params.length = 0; // Clear params if fetching all
         }
         // Students see only 'active' internships
         else if(req.user.role !== 'employer') {
             query = 'SELECT i.*, e.company_name FROM internships i JOIN employers e ON i.employer_id = e.id WHERE i.status = ?';
             params[0] = 'active';
         }


        const [internships] = await db.query(query, params);
        res.json(internships);
    } catch (err) {
        console.error("Get Internships Error:", err);
        res.status(500).json({ error: 'Server error fetching internships' });
    }
});

// Get Single Internship
 app.get('/api/internships/:id', authenticate, param('id').isInt(), async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

     try {
         const [internships] = await db.query(
             'SELECT i.*, e.company_name FROM internships i JOIN employers e ON i.employer_id = e.id WHERE i.id = ? AND i.status = ?',
             [req.params.id, 'active'] // Only allow viewing active ones by ID generally
         );
          if (internships.length === 0) {
             // Allow employer/admin to view their own non-active internships? Add logic if needed.
             return res.status(404).json({ error: 'Internship not found or not active' });
         }
         res.json(internships[0]);
     } catch (err) {
         console.error("Get Single Internship Error:", err);
         res.status(500).json({ error: 'Server error fetching internship' });
     }
 });

// Post New Internship
app.post('/api/internships', authenticate, authorize(['employer']), [
    body('title').notEmpty(),
    body('description').notEmpty(),
    // Add other necessary validations (duration, location, requirements)
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, requirements, duration, location } = req.body;
    const employerId = req.user.id;

    try {
        const [result] = await db.query(
            'INSERT INTO internships (employer_id, title, description, requirements, duration, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [employerId, title, description, requirements, duration, location, 'pending_review'] // Default to pending review
        );
        const newInternship = { id: result.insertId, employer_id: employerId, title, description, requirements, duration, location, status: 'pending_review' };
        io.emit('newInternship', newInternship); // Notify clients
        res.status(201).json({ message: 'Internship submitted for review', internship: newInternship });
    } catch (err) {
        console.error("Post Internship Error:", err);
        res.status(500).json({ error: 'Server error posting internship' });
    }
});

 // TODO: Add PUT /api/internships/:id (Update) and DELETE /api/internships/:id routes (requires ownership check)
 // TODO: Add Admin routes to change internship status from 'pending_review' to 'active'

// ** Application Routes **
// Get Applications (filtered)
app.get('/api/applications', authenticate, async (req, res) => {
    try {
        let query = 'SELECT a.*, s.name as student_name, s.email as student_email, i.title as internship_title, e.company_name FROM applications a JOIN students s ON a.student_id = s.id JOIN internships i ON a.internship_id = i.id JOIN employers e ON i.employer_id = e.id';
        const params = [];
        if (req.user.role === 'student') {
            query += ' WHERE a.student_id = ?';
            params.push(req.user.id);
        } else if (req.user.role === 'employer') {
             // Employers see applications for *their* internships
             query += ' WHERE i.employer_id = ?';
             params.push(req.user.id);
        } else if (req.user.role === 'admin' || req.user.role === 'super_admin') {
             // Admins see all
        } else {
             return res.status(403).json({ error: 'Forbidden' }); // Should not happen if auth middleware is correct
        }
         // Allow filtering by internshipId
        if(req.query.internshipId) {
            query += (params.length > 0 ? ' AND' : ' WHERE') + ' a.internship_id = ?';
            params.push(req.query.internshipId);
        }


        const [applications] = await db.query(query, params);
        res.json(applications);
    } catch (err) {
        console.error("Get Applications Error:", err);
        res.status(500).json({ error: 'Server error fetching applications' });
    }
});

// Submit Application
app.post('/api/applications', authenticate, authorize(['student']), [
    body('internshipId').isInt().withMessage('Valid internship ID is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { internshipId } = req.body;
    const studentId = req.user.id;

    try {
        // Check if internship exists and is active
        const [internships] = await db.query('SELECT id FROM internships WHERE id = ? AND status = ?', [internshipId, 'active']);
        if (internships.length === 0) {
            return res.status(404).json({ error: 'Active internship not found' });
        }

        // Prevent duplicate applications (handled by DB unique constraint too, but good to check)
         const [existing] = await db.query('SELECT id FROM applications WHERE student_id = ? AND internship_id = ?', [studentId, internshipId]);
         if (existing.length > 0) {
             return res.status(400).json({ error: 'You have already applied for this internship.' });
         }

        const [result] = await db.query(
            'INSERT INTO applications (student_id, internship_id, status) VALUES (?, ?, ?)',
            [studentId, internshipId, 'pending']
        );
        const newApplication = { id: result.insertId, student_id: studentId, internship_id: internshipId, status: 'pending' };
        io.emit('newApplication', newApplication); // Notify relevant clients
        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (err) {
         if (err.code === 'ER_DUP_ENTRY') { // Catch potential race condition for duplicate entry
             return res.status(400).json({ error: 'You have already applied for this internship.' });
         }
        console.error("Submit Application Error:", err);
        res.status(500).json({ error: 'Server error submitting application' });
    }
});

 // TODO: Add PUT /api/applications/:id route for employers/admins to update status (emit 'updatedApplication')


 // --- Admin Routes (Example: Approve Employer) ---
 app.put('/api/admin/employers/:id/approve', authenticate, authorize(['admin', 'super_admin']), [
     param('id').isInt()
 ], async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

     try {
         const [result] = await db.query('UPDATE employers SET approved =
