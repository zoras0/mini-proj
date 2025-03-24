import React from 'react';
import { Book, FileText, Video, Link } from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Book size={24} className="mr-2 text-blue-600" />
            <h2 className="text-2xl font-semibold">Internship Guides</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">How to Prepare for Your Internship</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Making the Most of Your Internship Experience</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Turning Your Internship into a Full-Time Job</a>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FileText size={24} className="mr-2 text-green-600" />
            <h2 className="text-2xl font-semibold">Resume & Cover Letter Tips</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">Crafting a Standout Resume</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Writing an Effective Cover Letter</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Tailoring Your Application to the Job Description</a>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Video size={24} className="mr-2 text-red-600" />
            <h2 className="text-2xl font-semibold">Video Tutorials</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">Acing Your Internship Interview</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Developing Professional Communication Skills</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Networking Strategies for Interns</a>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Link size={24} className="mr-2 text-purple-600" />
            <h2 className="text-2xl font-semibold">Useful Links</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">FCRIT Career Services</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Industry-Specific Internship Boards</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Professional Development Workshops</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Q: How do I apply for an internship through the FCRIT portal?</h3>
            <p>A: Log in to your student account, search for internships that interest you, and click the "Apply" button on the internship listing. Follow the prompts to submit your application.</p>
          </div>
          <div>
            <h3 className="font-semibold">Q: Can I apply for multiple internships at once?</h3>
            <p>A: Yes, you can apply for multiple internships. However, make sure to tailor your application for each position.</p>
          </div>
          <div>
            <h3 className="font-semibold">Q: How can I improve my chances of getting selected for an internship?</h3>
            <p>A: Focus on building relevant skills, create a strong resume, write a compelling cover letter, and prepare well for interviews. Utilize the resources provided on this page to enhance your application.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;