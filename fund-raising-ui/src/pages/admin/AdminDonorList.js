import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const AdminDonorList = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await api.get("/donors");
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">List of Donors</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Donor ID
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
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donors.map((donor) => (
            <tr key={donor.id}>
              <td className="px-6 py-4 whitespace-nowrap">{donor.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donor.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donor.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donor.email}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  to={`/admin/donors/${donor.id}`}
                  className="text-blue-500"
                >
                  View Details
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonorList;
