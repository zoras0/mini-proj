import React from 'react';
import { Star } from 'lucide-react';

const SuccessStories: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Success Stories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/60" alt="Student" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Priya Sharma</h2>
              <p className="text-gray-600">Computer Engineering, Class of 2023</p>
            </div>
          </div>
          <p className="mb-4">
            "My internship at TechCorp was an incredible learning experience. I worked on real-world projects and gained valuable skills in software development. The mentorship I received was outstanding, and I'm excited to announce that I've accepted a full-time position with them after graduation!"
          </p>
          <div className="flex items-center text-yellow-500">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/60" alt="Student" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Rahul Patel</h2>
              <p className="text-gray-600">Mechanical Engineering, Class of 2022</p>
            </div>
          </div>
          <p className="mb-4">
            "I interned at InnovateX, where I worked on cutting-edge robotics projects. The experience opened my eyes to the possibilities in the field of automation. Thanks to the skills I developed during my internship, I was able to secure a position at a leading robotics company."
          </p>
          <div className="flex items-center text-yellow-500">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/60" alt="Student" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Anita Desai</h2>
              <p className="text-gray-600">Information Technology, Class of 2023</p>
            </div>
          </div>
          <p className="mb-4">
            "My internship at DataPro Solutions exposed me to the world of big data and analytics. I worked on projects that helped me understand the practical applications of data science. This experience was instrumental in helping me decide my career path in data analytics."
          </p>
          <div className="flex items-center text-yellow-500">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/60" alt="Student" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Vikram Singh</h2>
              <p className="text-gray-600">Electronics Engineering, Class of 2022</p>
            </div>
          </div>
          <p className="mb-4">
            "I had the opportunity to intern at CircuitTech, where I worked on IoT devices. The hands-on experience I gained was invaluable. It helped me bridge the gap between theoretical knowledge and practical application. I'm now pursuing my master's degree in IoT technologies."
          </p>
          <div className="flex items-center text-yellow-500">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="mt-12 bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Share Your Success Story</h2>
        <p className="mb-4">
          Have you completed an internship through FCRIT's Internship Portal? We'd love to hear about your experience and share your success story with other students!
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Submit Your Story
        </button>
      </div>
    </div>
  );
};

export default SuccessStories;