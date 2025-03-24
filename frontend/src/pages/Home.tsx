import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Building, Shield } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to FCRIT Internship Portal</h1>
        <p className="text-xl text-center mb-12">Connecting students with exciting internship opportunities</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap size={48} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">For Students</h2>
            <p className="text-center mb-6">Find and apply for internships that match your skills and interests.</p>
            <Link to="/student" className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Student Portal
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <Building size={48} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">For Employers</h2>
            <p className="text-center mb-6">Post internship opportunities and find talented FCRIT students.</p>
            <Link to="/employer" className="block w-full bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition duration-300">
              Employer Portal
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <Briefcase size={48} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">For Admin</h2>
            <p className="text-center mb-6">Manage students and employers for FCRIT.</p>
            <Link to="/admin" className="block w-full bg-purple-600 text-white text-center py-2 rounded-md hover:bg-purple-700 transition duration-300">
              Admin Login
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <Shield size={48} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">For TPO/Super Admin</h2>
            <p className="text-center mb-6">Oversee and manage the entire internship system.</p>
            <Link to="/super-admin" className="block w-full bg-red-600 text-white text-center py-2 rounded-md hover:bg-red-700 transition duration-300">
              TPO Portal
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Why Choose FCRIT Internships?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quality Opportunities</h3>
              <p>Access internships from top companies across various industries.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Skill Development</h3>
              <p>Gain practical experience and enhance your professional skills.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Networking</h3>
              <p>Connect with industry professionals and build your network.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Career Guidance</h3>
              <p>Receive support and guidance from FCRIT faculty and career advisors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;