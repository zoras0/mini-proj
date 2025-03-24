import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
  year: z.string().min(1, "Current year is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  cgpa: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) <= 10, {
    message: "CGPA must be a valid number up to 10",
  }),
  skills: z.string().min(1, "Technical skills are required"),
  certifications: z.string().optional(),
  projects: z.string().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  experience: z.string().optional(),
  interests: z.string().min(1, "Areas of interest are required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john.doe@fcrit.ac.in",
      department: "Computer Engineering",
      year: "3rd Year",
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
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input
                  {...register('fullName')}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input
                  {...register('phone')}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

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
                <label className="block mb-2 font-medium">Department</label>
                <input
                  {...register('department')}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Current Year</label>
                <select
                  {...register('year')}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Roll Number</label>
                <input
                  {...register('rollNumber')}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.rollNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.rollNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">CGPA</label>
                <input
                  {...register('cgpa')}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.cgpa && (
                  <p className="text-red-500 text-sm mt-1">{errors.cgpa.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Technical Skills</label>
              <textarea
                {...register('skills')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="List your technical skills"
              />
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Certifications</label>
              <textarea
                {...register('certifications')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="List your certifications"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Projects</label>
              <textarea
                {...register('projects')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Describe your projects"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">LinkedIn Profile</label>
                <input
                  {...register('linkedin')}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://linkedin.com/in/username"
                />
                {errors.linkedin && (
                  <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">GitHub Profile</label>
                <input
                  {...register('github')}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://github.com/username"
                />
                {errors.github && (
                  <p className="text-red-500 text-sm mt-1">{errors.github.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Prior Experience</label>
              <textarea
                {...register('experience')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Describe your prior work experience"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Areas of Interest</label>
              <textarea
                {...register('interests')}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="List your areas of interest"
              />
              {errors.interests && (
                <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Resume/CV</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full px-3 py-2 border rounded-md"
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;