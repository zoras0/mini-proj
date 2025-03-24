import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const closeInternshipSchema = z.object({
  reason: z.string().optional(),
});

type CloseInternshipFormData = z.infer<typeof closeInternshipSchema>;

interface CloseInternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CloseInternshipFormData) => void;
  internshipTitle: string;
}

const CloseInternshipModal: React.FC<CloseInternshipModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  internshipTitle,
}) => {
  const { register, handleSubmit } = useForm<CloseInternshipFormData>({
    resolver: zodResolver(closeInternshipSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Close Internship Position</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <p className="mb-4">
            Are you sure you want to close the internship position for "{internshipTitle}"?
            This will notify all applicants and remove the position from active listings.
          </p>

          <form onSubmit={handleSubmit(onConfirm)} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">
                Reason for closing (optional)
              </label>
              <textarea
                {...register('reason')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., Position filled, Project cancelled, etc."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Close Position
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CloseInternshipModal;