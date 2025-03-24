import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const profileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Invalid website URL"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditEmployerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditEmployerProfileModal: React.FC<EditEmployerProfileModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      companyName: "TechCorp Inc.",
      industry: "Information Technology",
      description: "Leading technology solutions provider...",
      location: "Mumbai, Maharashtra",
      website: "https://www.techcorp.com",
      email: "contact@techcorp.com",
      phone: "1234567890"
    }
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    // Handle profile update
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit Company Profile</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Company Logo</label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Logo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="flex-1 px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Company Name</label>
              <input
                {...register('companyName')}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Industry Type</label>
              <select
                {...register('industry')}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Software Development">Software Development</option>
                <option value="Consulting">Consulting</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
              </select>
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Company Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Describe your company..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Location</label>
              <input
                {...register('location')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="City, State"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Website URL</label>
              <input
                {...register('website')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://www.example.com"
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone</label>
                <input
                  {...register('phone')}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
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
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployerProfileModal;