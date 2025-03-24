import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <ChatbotProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<StudentPortal />} />
              <Route path="/employer" element={<EmployerPortal />} />
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