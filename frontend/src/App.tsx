import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import io from 'socket.io-client';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudentPortal from './pages/StudentPortal';
import EmployerPortal from './pages/EmployerPortal';
import AdminPanel from './pages/AdminPanel';
import SuperAdminLogin from './pages/SuperAdminLogin';
import SuperAdminPanel from './pages/SuperAdminPanel';
import Resources from './pages/Resources';
import SuccessStories from './pages/SuccessStories';
import FAQ from './pages/FAQ';
import { ChatbotProvider } from './context/ChatbotContext';
import Chatbot from './components/Chatbot';
import axios from 'axios';

// Helper function to check authentication and role from token
const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { isAuthenticated: false, role: null };
  }
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    // Ensure your token actually has a 'role' property
    return { isAuthenticated: true, role: decodedToken.role || null }; 
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem('token'); // Remove invalid token
    return { isAuthenticated: false, role: null };
  }
};

// ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = checkAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />; // Redirect to home/login page
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to an unauthorized page or home if role not allowed
    console.warn(`User role '${role}' not allowed for this route.`);
    return <Navigate to="/" replace />; // Or to a specific unauthorized page
  }

  return children; // Render the component if authenticated and role is allowed
};


function App() {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state for initial fetch

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true); // Start loading
      try {
        // Fetch data only if authenticated (optional, but good practice)
        const { isAuthenticated } = checkAuth();
        if (isAuthenticated) {
            const token = localStorage.getItem('token'); // Get token for requests
             // Fetch internships - assuming all users can see them
            const internshipsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/internships`, {
                 headers: { Authorization: `Bearer ${token}` } // Add token if needed by endpoint
            });
             setInternships(internshipsResponse.data);
            // Fetch applications based on role? Or fetch specific ones later in portals?
            // For now, let's fetch all accessible applications (modify endpoint if needed)
            // const applicationsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/applications`, {
            //      headers: { Authorization: `Bearer ${token}` }
            // });
            // setApplications(applicationsResponse.data);
        } else {
             setInternships([]); // Clear data if not authenticated
             setApplications([]);
        }

      } catch (error) {
        console.error('Error fetching initial data:', error);
        // Handle error appropriately
      } finally {
          setIsLoading(false); // Finish loading
      }
    };

    fetchInitialData();

    // Set up Socket.IO connection (remains the same)
    const socket = io(`${import.meta.env.VITE_API_URL}`); 
    // ... (socket event listeners remain the same as your previous code) ...
      socket.on('connect', () => { /* ... */ });
      socket.on('newInternship', (data) => { /* ... */ setInternships(prev => [...prev, data])});
      socket.on('updatedInternship', (data) => { /* ... */ setInternships(prev => prev.map(i => i.id === data.id ? data : i))});
      socket.on('newApplication', (data) => { /* ... */ setApplications(prev => [...prev, data])});
      socket.on('updatedApplication', (data) => { /* ... */ setApplications(prev => prev.map(a => a.id === data.id ? data : a))});
      socket.on('disconnect', () => { /* ... */ });


    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array: Run fetch and socket setup once on mount


  if (isLoading) {
      return <div>Loading...</div>; // Show loading indicator while fetching
  }

  return (
    <ChatbotProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Protected Routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentPortal internships={internships} applications={applications} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer"
                element={
                  <ProtectedRoute allowedRoles={['employer']}>
                    <EmployerPortal internships={internships} applications={applications} />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/admin"
                 element={
                   <ProtectedRoute allowedRoles={['admin']}> {/* Or ['admin', 'super_admin'] */}
                     <AdminPanel />
                   </ProtectedRoute>
                 }
               />
                 <Route path="/super-admin" element={<SuperAdminLogin />} /> {/* Assuming login is public */}
                <Route
                 path="/super-admin/dashboard"
                 element={
                   <ProtectedRoute allowedRoles={['super_admin']}> {/* Adjust role if needed */}
                     <SuperAdminPanel />
                   </ProtectedRoute>
                 }
               />

              {/* Public Routes */}
              <Route path="/resources" element={<Resources />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/faq" element={<FAQ />} />

               {/* Add a catch-all or Not Found route */}
               <Route path="*" element={<div>Page Not Found</div>} />

            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ChatbotProvider>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudentPortal from './pages/StudentPortal';
import EmployerPortal from './pages/EmployerPortal';
import AdminPanel from './pages/AdminPanel';
import SuperAdminLogin from './pages/SuperAdminLogin';
import SuperAdminPanel from './pages/SuperAdminPanel';
import Resources from './pages/Resources';
import SuccessStories from './pages/SuccessStories';
import FAQ from './pages/FAQ';
import { ChatbotProvider } from './context/ChatbotContext';
import Chatbot from './components/Chatbot';
import axios from 'axios'; // Import axios


function App() {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // 1. Fetch initial data
    const fetchInitialData = async () => {
      try {
        const [internshipsResponse, applicationsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/internships`), // Replace with your actual endpoint
          axios.get(`${import.meta.env.VITE_API_URL}/applications`), // Replace with your actual endpoint
        ]);
        setInternships(internshipsResponse.data);
        setApplications(applicationsResponse.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        // Handle error appropriately (e.g., display an error message)
      }
    };
    fetchInitialData();

    // 2. Set up Socket.IO connection
    const socket = io(`${import.meta.env.VITE_API_URL}`); // Use environment variable

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('newInternship', (data) => {
      console.log('New internship posted:', data);
      setInternships(prevInternships => [...prevInternships, data]);
    });

    socket.on('updatedInternship', (data) => {
      console.log('Internship updated:', data);
      setInternships(prevInternships =>
        prevInternships.map(internship =>
          internship.id === data.id ? data : internship
        )
      );
    });

    socket.on('newApplication', (data) => {
      console.log('New application received:', data);
      setApplications(prevApplications => [...prevApplications, data]);
    });

    socket.on('updatedApplication', (data) => {
      console.log('Application updated:', data);
      setApplications(prevApplications =>
        prevApplications.map(application =>
          application.id === data.id ? data : application
        )
      );
    });


    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ChatbotProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Pass internships and applications to relevant portals */}
              <Route path="/student" element={<StudentPortal internships={internships} applications={applications} />} />
              <Route path="/employer" element={<EmployerPortal internships={internships} applications={applications} />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/super-admin" element={<SuperAdminLogin />} />
              <Route path="/super-admin/dashboard" element={<SuperAdminPanel />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ChatbotProvider>
  );
}

export default App;
