import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUserStatus = async (userId, status) => {
    try {
      await api.put(`/users/${userId}/status`, { status });
      // Update the local state to reflect the changes
      fetchUsers();
    } catch (error) {
      console.error(`Error updating user status: ${error}`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">List of Users</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SSN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.ssn}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user?.status === "Pending" && (
                  <>
                    <button
                      className="text-green-500 mr-2"
                      onClick={() => updateUserStatus(user.id, "Approved")}
                    >
                      Approve
                    </button>
                    
                    <button
                      className="text-red-500"
                      onClick={() => updateUserStatus(user.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {user?.status === "Approved" && (
                  <>

                    
                    <button
                      className="text-red-500"
                      onClick={() => updateUserStatus(user.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {user?.status === "Rejected" && (
                  <>
                    <button
                      className="text-green-500 mr-2"
                      onClick={() => updateUserStatus(user.id, "Approved")}
                    >
                      Approve
                    </button>
                    
                    
                  </>
                )}
                

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersList;
