import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

const DonorDonationsList = () => {
  const [donations, setDonations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await api.get(`/donations/donor/${user?.id}`);
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Donations</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Donation ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Campaign
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td className="px-6 py-4 whitespace-nowrap">{donation.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${donation.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {donation?.campaignData?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{donation.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonorDonationsList;
