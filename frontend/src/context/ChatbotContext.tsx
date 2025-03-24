import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'student' | 'employer' | 'admin' | 'superadmin' | 'guest';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  userRole: UserRole;
  toggleChatbot: () => void;
  sendMessage: (message: string) => void;
  setUserRole: (role: UserRole) => void;
  clearChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your FCRIT Internship Portal assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [userRole, setUserRole] = useState<UserRole>('guest');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your FCRIT Internship Portal assistant. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const sendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Process the message and get a response
    const response = await getChatbotResponse(message, userRole);
    
    // Add bot response to chat
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        messages,
        userRole,
        toggleChatbot,
        sendMessage,
        setUserRole,
        clearChat,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

// Helper function to get chatbot responses based on user role and query
async function getChatbotResponse(message: string, role: UserRole): Promise<string> {
  const normalizedMessage = message.toLowerCase();
  
  // Common responses for all users
  if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
    return `Hello! How can I help you with the internship portal today?`;
  }
  
  if (normalizedMessage.includes('thank')) {
    return 'You\'re welcome! Is there anything else I can help you with?';
  }
  
  // Role-specific responses
  switch (role) {
    case 'student':
      return getStudentResponse(normalizedMessage);
    case 'employer':
      return getEmployerResponse(normalizedMessage);
    case 'admin':
      return getAdminResponse(normalizedMessage);
    case 'superadmin':
      return getSuperAdminResponse(normalizedMessage);
    default:
      return getGuestResponse(normalizedMessage);
  }
}

function getStudentResponse(message: string): string {
  if (message.includes('apply') || message.includes('application')) {
    return 'To apply for an internship, navigate to the internship listing, click on the internship you\'re interested in, and click the "Apply" button. You\'ll need to upload your resume and answer any additional questions the employer has specified.';
  }
  
  if (message.includes('resume') || message.includes('cv')) {
    return 'You can upload or update your resume in your profile settings. We recommend using a PDF format and keeping it to 1-2 pages.';
  }
  
  if (message.includes('status') || message.includes('application status')) {
    return 'You can check the status of your applications in the "My Applications" section of your dashboard. Applications can be pending, under review, accepted, or rejected.';
  }
  
  return 'As a student, you can browse and apply for internships, update your profile, track application status, and communicate with employers. What specific help do you need?';
}

function getEmployerResponse(message: string): string {
  if (message.includes('post') || message.includes('create internship')) {
    return 'To post a new internship, go to your dashboard and click on "Post New Internship". Fill out the details including title, description, requirements, and application deadline.';
  }
  
  if (message.includes('applicant') || message.includes('applications')) {
    return 'You can view and manage applications for your internships in the "Manage Applications" section. From there, you can review applicant profiles, download resumes, and update application statuses.';
  }
  
  if (message.includes('edit') || message.includes('update internship')) {
    return 'To edit an existing internship posting, go to "My Internships", find the listing you want to modify, and click the "Edit" button.';
  }
  
  return 'As an employer, you can post internships, review applications, communicate with candidates, and manage your company profile. What specific help do you need?';
}

function getAdminResponse(message: string): string {
  if (message.includes('approve') || message.includes('company')) {
    return 'To approve a new company registration, go to the "Approve Companies" tab in your admin dashboard. Review the company details and click "Approve" or "Reject".';
  }
  
  if (message.includes('user') || message.includes('manage user')) {
    return 'You can manage users in the "Manage Users" section. From there, you can view, edit, or deactivate student and employer accounts.';
  }
  
  if (message.includes('report') || message.includes('statistics')) {
    return 'To generate reports, navigate to the "Generate Reports" tab. You can create reports on internship placements, active companies, student participation, and more.';
  }
  
  return 'As an admin, you can approve companies, manage users, review internships, and generate reports. What specific administrative task do you need help with?';
}

function getSuperAdminResponse(message: string): string {
  if (message.includes('department') || message.includes('departments')) {
    return 'To manage departments, go to the "Manage Departments" section in your dashboard. You can add new departments, edit existing ones, or assign department administrators.';
  }
  
  if (message.includes('admin') || message.includes('manage admin')) {
    return 'You can manage admin accounts in the "Manage Admins" section. From there, you can create new admin accounts, modify permissions, or deactivate existing admins.';
  }
  
  if (message.includes('system') || message.includes('settings')) {
    return 'System settings can be configured in the "System Settings" section. This includes email notifications, application deadlines, and portal-wide announcements.';
  }
  
  return 'As a TPO/Super Admin, you have full control over the portal including managing departments, admins, system settings, and generating comprehensive reports. What specific area do you need assistance with?';
}

function getGuestResponse(message: string): string {
  if (message.includes('sign up') || message.includes('register')) {
    return 'To sign up, click on the appropriate portal for your role (Student, Employer, Admin) from the home page, then click "Sign Up" and follow the instructions.';
  }
  
  if (message.includes('login') || message.includes('sign in')) {
    return 'To log in, select your portal type from the home page, then enter your email and password in the login form.';
  }
  
  if (message.includes('forgot password') || message.includes('reset password')) {
    return 'If you forgot your password, click on the "Forgot Password" link on the login page and follow the instructions to reset it.';
  }
  
  return 'Welcome to FCRIT Internship Portal! You can sign up as a student to find internships, as an employer to post opportunities, or browse general information. How can I help you get started?';
} 