import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const employerSignUpSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type EmployerSignUpFormData = z.infer<typeof employerSignUpSchema>;

interface EmployerSignUpProps {
  onSignUpSuccess: () => void;
}

const EmployerSignUp: React.FC<EmployerSignUpProps> = ({ onSignUpSuccess }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployerSignUpFormData>({
    resolver: zodResolver(employerSignUpSchema),
  });

  const onSubmit = async (data: EmployerSignUpFormData) => {
    try {
      setServerError(null);
      console.log('Attempting to sign up with:', {
        ...data,
        password: '[REDACTED]'
      });
      console.log('API URL:', import.meta.env.VITE_API_URL);
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/employers/signup`,
        {
          companyName: data.companyName,
          contactName: data.contactName,
          email: data.email,
          password: data.password,
        }
      );
      console.log("Employer signup successful:", response.data);
      onSignUpSuccess();
    } catch (error) {
      console.error("Error signing up:", error);
      if (axios.isAxiosError(error)) {
        console.error('Full error response:', error.response);
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message ||
                           "An error occurred during signup. Please try again.";
        setServerError(errorMessage);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Employer Sign Up</h2>
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            {...register("companyName")}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contactName" className="block mb-2">
            Contact Person Name
          </label>
          <input
            type="text"
            id="contactName"
            {...register("contactName")}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSignUpSuccess}
            className="text-green-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default EmployerSignUp; 