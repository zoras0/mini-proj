import React from 'react';
import { X, Download, Calendar } from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  appliedDate: string;
}

interface ViewInternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: {
    title: string;
    company: string;
    description: string;
    duration: string;
    location: string;
    requirements: string;
    applicants: Applicant[];
  };
}

const ViewInternshipModal: React.FC<ViewInternshipModalProps> = ({ isOpen, onClose, internship }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{internship.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Internship Details</h3>
              <div className="space-y-2">
                <p><strong>Company:</strong> {internship.company}</p>
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Location:</strong> {internship.location}</p>
                <p><strong>Description:</strong> {internship.description}</p>
                <p><strong>Requirements:</strong> {internship.requirements}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Applications ({internship.applicants.length})</h3>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Download size={18} className="mr-2" />
                  Download All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Applied Date</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {internship.applicants.map((applicant) => (
                      <tr key={applicant.id}>
                        <td className="px-4 py-2">{applicant.name}</td>
                        <td className="px-4 py-2">{applicant.email}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            {
                              pending: 'bg-yellow-100 text-yellow-800',
                              reviewed: 'bg-blue-100 text-blue-800',
                              shortlisted: 'bg-green-100 text-green-800',
                              rejected: 'bg-red-100 text-red-800',
                            }[applicant.status]
                          }`}>
                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-2">{applicant.appliedDate}</td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            <Download size={18} />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Calendar size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInternshipModal;