import React, { useState } from 'react';
import ViewInternshipModal from './ViewInternshipModal';
import CloseInternshipModal from './CloseInternshipModal';

interface InternshipActionsProps {
  internship: {
    id: string;
    title: string;
    company: string;
    description: string;
    duration: string;
    location: string;
    requirements: string;
    status: 'active' | 'closed';
    applicants: Array<{
      id: string;
      name: string;
      email: string;
      status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
      appliedDate: string;
    }>;
  };
  onStatusChange: (internshipId: string, newStatus: 'active' | 'closed') => void;
}

export const InternshipActions: React.FC<InternshipActionsProps> = ({ internship, onStatusChange }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const handleCloseInternship = () => {
    onStatusChange(internship.id, 'closed');
    setIsCloseModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsViewModalOpen(true)}
        className="text-blue-600 hover:text-blue-800"
      >
        View
      </button>
      {internship.status === 'active' && (
        <button
          onClick={() => setIsCloseModalOpen(true)}
          className="ml-2 text-red-600 hover:text-red-800"
        >
          Close
        </button>
      )}

      <ViewInternshipModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        internship={internship}
      />

      <CloseInternshipModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleCloseInternship}
        internshipTitle={internship.title}
      />
    </>
  );
};