import React, { useState } from 'react';
import { Search, Eye, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

const companies = [
  { id: 1, name: 'TechCorp Inc.', industry: 'Information Technology', registrationDate: '2024-03-01', status: 'Pending' },
  { id: 2, name: 'InnovateX', industry: 'Software Development', registrationDate: '2024-03-02', status: 'Pending' },
  { id: 3, name: 'Global Solutions Ltd.', industry: 'Consulting', registrationDate: '2024-03-03', status: 'Pending' },
  // Add more mock data as needed
];

const ApproveCompanies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const companiesPerPage = 10;

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleViewDetails = (company: any) => {
    setSelectedCompany(company);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
  };

  const handleApprove = (companyId: number) => {
    console.log(`Approve company with id: ${companyId}`);
    // Implement approval logic here
  };

  const handleReject = (companyId: number) => {
    console.log(`Reject company with id: ${companyId}`);
    // Implement rejection logic here
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Approve Companies</h2>
      <div className="mb-4 flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search companies..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select className="ml-4 px-4 py-2 border rounded-md">
          <option value="">All Industries</option>
          <option value="it">Information Technology</option>
          <option value="software">Software Development</option>
          <option value="consulting">Consulting</option>
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCompanies.map((company) => (
              <tr key={company.id}>
                <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{company.industry}</td>
                <td className="px-6 py-4 whitespace-nowrap">{company.registrationDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {company.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleViewDetails(company)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => handleApprove(company.id)} className="text-green-600 hover:text-green-900 mr-2">
                    <Check size={18} />
                  </button>
                  <button onClick={() => handleReject(company.id)} className="text-red-600 hover:text-red-900">
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          Showing {indexOfFirstCompany + 1} to {Math.min(indexOfLastCompany, filteredCompanies.length)} of {filteredCompanies.length} companies
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
      {selectedCompany && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Company Details</h3>
              <p><strong>Name:</strong> {selectedCompany.name}</p>
              <p><strong>Industry:</strong> {selectedCompany.industry}</p>
              <p><strong>Registration Date:</strong> {selectedCompany.registrationDate}</p>
              <p><strong>Status:</strong> {selectedCompany.status}</p>
              <div className="mt-4">
                <textarea
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows={4}
                  placeholder="Add comments or request additional information..."
                ></textarea>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 mb-2"
                  onClick={() => handleApprove(selectedCompany.id)}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 mb-2"
                  onClick={() => handleReject(selectedCompany.id)}
                >
                  Reject
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

export default ApproveCompanies;