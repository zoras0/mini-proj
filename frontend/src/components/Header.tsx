import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase size={24} />
          <span className="text-xl font-bold">FCRIT Internships</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/student" className="hover:text-blue-200">Students</Link></li>
            <li><Link to="/employer" className="hover:text-blue-200">Employers</Link></li>
            <li><Link to="/admin" className="hover:text-blue-200">Admin</Link></li>
            <li><Link to="/super-admin" className="hover:text-blue-200">TPO Portal</Link></li>
            <li><Link to="/success-stories" className="hover:text-blue-200">Success Stories</Link></li>
            <li><Link to="/faq" className="hover:text-blue-200">FAQ</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;