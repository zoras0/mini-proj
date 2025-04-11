import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Briefcase, Users, FileText } from "lucide-react";
import EditEmployerProfileModal from "../components/EditEmployerProfileModal";
import { InternshipActions } from "../components/internship/InternshipActions";
import axios from "axios";
import EmployerSignUp from "../components/EmployerSignUp";

// If you move login to another component, remove this schema
const employerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type EmployerFormData = z.infer<typeof employerSchema>;

interface Applicant {  // Define Applicant interface
  id: string;
  name: string;
  email: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  appliedDate: string;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  requirements: string;
  status: "active" | "closed";
  applicants?: Applicant[]; // Make applicants optional
}


const EmployerPortal: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<any[]>([]); // Replace 'any' with a more specific type if you have one
  const [newInternship, setNewInternship] = useState({
    title: "",
    description: "",
    duration: "",
    location: "",
    requirements: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Remove if login moved
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // Remove if login moved
  const [serverError, setServerError] = useState<string | null>(null); // Remove if login moved
  const [employerId, setEmployerId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setEmployerId(decodedToken.id);
        setIsLoggedIn(true); // Set isLoggedIn to true if token exists
        fetchEmployerData();
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const fetchEmployerData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !employerId) {
        // Handle case where token or employerId is not available (e.g., redirect to login)
        return;
      }

      // Assuming you have an endpoint to get employer-specific data
      const [internshipsResponse, applicationsResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/internships?employerId=${employerId}`, {  // Adjust URL
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/applications?employerId=${employerId}`, { // Adjust URL
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      console.log(internshipsResponse.data)
      setInternships(internshipsResponse.data);
      setApplications(applicationsResponse.data);
    } catch (error) {
      console.error('Error fetching employer data:', error);
      // Handle errors (e.g., display an error message)
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInternship((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostInternship = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !employerId) {
        console.error("No token found");
        // Handle the error appropriately, e.g., redirect to login
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/internships`,
        { ...newInternship, employerId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Internship posted:", response.data);
      // Clear the form after successful submission:
      setNewInternship({
        title: "",
        description: "",
        duration: "",
        location: "",
        requirements: "",
      });
      // The real-time update from Socket.IO should automatically refresh the list
      fetchEmployerData(); // Re-fetch data to include the new internship
    } catch (error) {
      console.error("Error posting internship:", error);
      // Handle errors (e.g., display an error message)
    }
  };

  const handleInternshipStatusChange = (
    internshipId: string,
    newStatus: "active" | "closed"
  ) => {
    setInternships((prevInternships) =>
      prevInternships.map((internship) =>
        internship.id === internshipId
          ? { ...internship, status: newStatus }
          : internship
      )
    );
  };

  const onSubmit = async (data: EmployerFormData) => { // Remove if login moved
    try {
      setServerError(null);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/employers/login`,
        data
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token); // Store the token
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "An error occurred during login. Please try again.";
        setServerError(errorMessage);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (!isLoggedIn) { // Remove if login moved
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employer Portal</h1>
        {showSignUp ? (
          <EmployerSignUp onSignUpSuccess={() => setShowSignUp(false)} />
        ) : (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            {serverError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {serverError}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setShowSignUp(true)}
                className="text-green-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Post Internship Form */}
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Post a New Internship
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); handlePostInternship(); }}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Internship Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newInternship.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newInternship.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="block mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={newInternship.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., 3 months"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newInternship.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="requirements" className="block mb-2">
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={newInternship.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Post Internship
              </button>
            </form>
          </div>
        </div>

        {/* Right column - Company Profile and Stats */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Company Profile</h2>
            <div className="space-y-2">
              {/* Replace mock data with actual company info if available */}
              <p>
                <strong>Company:</strong> TechCorp Inc.
              </p>
              <p>
                <strong>Industry:</strong> Information Technology
              </p>
              <p>
                <strong>Location:</strong> Mumbai, Maharashtra
              </p>
              <p>
                <strong>Website:</strong> www.techcorp.com
              </p>
            </div>
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Briefcase size={24} className="mr-2 text-green-600" />
                <div>
                  <p className="font-semibold">Active Internships</p>
                  <p className="text-2xl font-bold">{internships.length}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users size={24} className="mr-2 text-blue-600" />
                <div>
                  <p className="font-semibold">Total Applicants</p>
                  <p className="text-2xl font-bold">
                    {internships.reduce((sum, internship) => 
                      sum + (internship.applicants ? internship.applicants.length : 0), 0
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText size={24} className="mr-2 text-purple-600" />
                <div>
                  <p className="font-semibold">Pending Reviews</p>
                  <p className="text-2xl font-bold">
                    {internships.reduce(
                      (sum, internship) =>
                        sum +
                        (internship.applicants ? internship.applicants.filter((a) => a.status === "pending").length : 0), 0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Internships Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Active Internships</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Duration</th>
                <th className="text-left py-2">Applicants</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((internship) => (
                <tr key={internship.id} className="border-b">
                  <td className="py-2">{internship.title}</td>
                  <td className="py-2">{internship.duration}</td>
                  <td className="py-2">{internship.applicants ? internship.applicants.length : 0}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        internship.status === "active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {internship.status.charAt(0).toUpperCase() +
                        internship.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2">
                    <InternshipActions
                      internship={internship}
                      onStatusChange={handleInternshipStatusChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditEmployerProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />
    </div>
  );
};

export default EmployerPortal;
