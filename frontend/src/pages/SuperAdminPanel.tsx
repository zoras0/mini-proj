import React, { useState } from "react";
import { Users, Briefcase, FileText, BarChart2, School, Database, Settings, User } from "lucide-react";
import ManageUsers from "./admin/ManageUsers";
import ApproveCompanies from "./admin/ApproveCompanies";
import ReviewInternships from "./admin/ReviewInternships";
import GenerateReports from "./admin/GenerateReports";

const SuperAdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "manageUsers":
        return <ManageUsers />;
      case "approveCompanies":
        return <ApproveCompanies />;
      case "reviewInternships":
        return <ReviewInternships />;
      case "generateReports":
        return <GenerateReports />;
      case "manageDepartments":
        return <div>Manage Departments Content</div>;
      case "manageAdmins":
        return <div>Manage Admins Content</div>;
      case "systemSettings":
        return <div>System Settings Content</div>;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              icon={<Users size={24} />}
              title="Total Users"
              value="2,538"
            />
            <DashboardCard
              icon={<Briefcase size={24} />}
              title="Active Companies"
              value="124"
            />
            <DashboardCard
              icon={<FileText size={24} />}
              title="Internships"
              value="347"
            />
            <DashboardCard
              icon={<School size={24} />}
              title="Departments"
              value="8"
            />
            <DashboardCard
              icon={<User size={24} />}
              title="Admins"
              value="12"
            />
         
            <DashboardCard
              icon={<BarChart2 size={24} />}
              title="Placement Rate"
              value="85%"
            />
           
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">TPO / Super Admin Dashboard</h1>
      <div className="flex flex-wrap mb-8">
        <TabButton
          icon={<Users size={20} />}
          title="Manage Users"
          active={activeTab === "manageUsers"}
          onClick={() => setActiveTab("manageUsers")}
        />
        <TabButton
          icon={<Briefcase size={20} />}
          title="Approve Companies"
          active={activeTab === "approveCompanies"}
          onClick={() => setActiveTab("approveCompanies")}
        />
        <TabButton
          icon={<FileText size={20} />}
          title="Review Internships"
          active={activeTab === "reviewInternships"}
          onClick={() => setActiveTab("reviewInternships")}
        />
        <TabButton
          icon={<BarChart2 size={20} />}
          title="Generate Reports"
          active={activeTab === "generateReports"}
          onClick={() => setActiveTab("generateReports")}
        />
        <TabButton
          icon={<School size={20} />}
          title="Manage Departments"
          active={activeTab === "manageDepartments"}
          onClick={() => setActiveTab("manageDepartments")}
        />
        <TabButton
          icon={<User size={20} />}
          title="Manage Admins"
          active={activeTab === "manageAdmins"}
          onClick={() => setActiveTab("manageAdmins")}
        />
        <TabButton
          icon={<Settings size={20} />}
          title="System Settings"
          active={activeTab === "systemSettings"}
          onClick={() => setActiveTab("systemSettings")}
        />
      </div>
      {renderContent()}
    </div>
  );
};

const TabButton: React.FC<{
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, title, active, onClick }) => (
  <button
    className={`flex items-center px-4 py-2 mr-2 mb-2 rounded-md ${
      active ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
    } hover:bg-red-700 hover:text-white transition duration-300`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{title}</span>
  </button>
);

const DashboardCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
}> = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="bg-red-100 p-3 rounded-full mr-4">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default SuperAdminPanel; 