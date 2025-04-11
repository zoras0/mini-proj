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
