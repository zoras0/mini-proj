import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const applicationSchema = z.object({
  coverLetter: z.string().min(100, "Cover letter must be at least 100 characters"),
  startDate: z.string().min(1, "Start date is required"),
  availability: z.enum(["full-time", "part-time"]),
  references: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  internshipTitle: string;
  companyName: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, internshipTitle, companyName }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = (data: ApplicationFormData) => {
    console.log(data);
    // Handle application submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Apply for {internshipTitle}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">{companyName}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Cover Letter</label>
              <textarea
                {...register('coverLetter')}
                rows={6}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Why are you interested in this position?"
              />
              {errors.coverLetter && (
                <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Resume/CV</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Expected Start Date</label>
              <input
                type="date"
                {...register('startDate')}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Availability</label>
              <select
                {...register('availability')}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
              </select>
              {errors.availability && (
                <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">References (Optional)</label>
              <textarea
                {...register('references')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="List any references with their contact information"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Additional Documents</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;