import React, { useState } from 'react';
import { Search, Eye, Check, X, Edit, Flag, ChevronLeft, ChevronRight } from 'lucide-react';

const internships = [
  { id: 1, title: 'Software Engineering Intern', company: 'TechCorp Inc.', postedDate: '2024-03-01', status: 'Pending' },
  { id: 2, title: 'Data Science Intern', company: 'DataPro Solutions', postedDate: '2024-03-02', status: 'Pending' },
  { id: 3, title: 'Marketing Intern', company: 'Global Brands Ltd.', postedDate: '2024-03-03', status: 'Pending' },
  // Add more mock data as needed
];

const ReviewInternships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const internshipsPerPage = 10;

  const filteredInternships = internships.filter(internship =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = filteredInternships.slice(indexOfFirstInternship, indexOfLastInternship);

  const totalPages = Math.ceil(filteredInternships.length / internshipsPerPage);

  const handleViewDetails = (internship: any) => {
    setSelectedInternship(internship);
  };

  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  const handleApprove = (internshipId: number) => {
    console.log(`Approve internship with id: ${internshipId}`);
    // Implement approval logic here
  };

  const handleReject = (internshipId: number) => {
    console.log(`Reject internship with id: ${internshipId}`);
    // Implement rejection logic here
  };

  const handleEdit = (internshipId: number) => {
    console.log(`Edit internship with id: ${internshipId}`);
    // Implement edit logic here
  };

  const handleFlag = (internshipId: number) => {
    console.log(`Flag internship with id: ${internshipId}`);
    // Implement flag logic here
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Review Internships</h2>
      <div className="mb-4 flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search internships..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select className="ml-4 px-4 py-2 border rounded-md">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentInternships.map((internship) => (
              <tr key={internship.id}>
                <td className="px-6 py-4 whitespace-nowrap">{internship.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{internship.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{internship.postedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {internship.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleViewDetails(internship)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => handleApprove(internship.id)} className="text-green-600 hover:text-green-900 mr-2">
                    <Check size={18} />
                  </button>
                  <button onClick={() => handleReject(internship.id)} className="text-red-600 hover:text-red-900 mr-2">
                    <X size={18} />
                  </button>
                  <button onClick={() => handleEdit(internship.id)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleFlag(internship.id)} className="text-orange-600 hover:text-orange-900">
                    <Flag size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          Showing {indexOfFirstInternship + 1} to {Math.min(indexOfLastInternship, filteredInternships.length)} of {filteredInternships.length} internships
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 px-2 py-1 border rounded-md disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-2 px-2 py-1 border rounded-md disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {selectedInternship && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Internship Details</h3>
              <p><strong>Title:</strong> {selectedInternship.title}</p>
              <p><strong>Company:</strong> {selectedInternship.company}</p>
              <p><strong>Posted Date:</strong> {selectedInternship.postedDate}</p>
              <p><strong>Status:</strong> {selectedInternship.status}</p>
              <div className="mt-4">
                <textarea
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows={4}
                  placeholder="Add comments or edit internship details..."
                ></textarea>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 mb-2"
                  onClick={() => handleApprove(selectedInternship.id)}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 mb-2"
                  onClick={() => handleReject(selectedInternship.id)}
                >
                  Reject
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                  onClick={() => handleEdit(selectedInternship.id)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300 mb-2"
                  onClick={() => handleFlag(selectedInternship.id)}
                >
                  Flag for Review
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewInternships;