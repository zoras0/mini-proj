import React, { useState } from 'react';
import { Search, Edit2, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Student', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Employer', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', type: 'Student', status: 'Inactive' },
  // Add more mock data as needed
];

const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const usersPerPage = 10;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <div className="mb-4 flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select className="ml-4 px-4 py-2 border rounded-md">
          <option value="">All Types</option>
          <option value="student">Student</option>
          <option value="employer">Employer</option>
        </select>
        <select className="ml-4 px-4 py-2 border rounded-md">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEditUser(user)} className="text-indigo-600 hover:text-indigo-900">
                    <Edit2 size={18} />
                  </button>
                  <button className="ml-2 text-gray-600 hover:text-gray-900">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit User</h3>
              <div className="mt-2 px-7 py-3">
                <input type="text" value={selectedUser.name} className="mb-2 px-3 py-2 border rounded-md w-full" />
                <input type="email" value={selectedUser.email} className="mb-2 px-3 py-2 border rounded-md w-full" />
                <select value={selectedUser.type} className="mb-2 px-3 py-2 border rounded-md w-full">
                  <option value="Student">Student</option>
                  <option value="Employer">Employer</option>
                </select>
                <select value={selectedUser.status} className="mb-2 px-3 py-2 border rounded-md w-full">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleCloseModal}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;