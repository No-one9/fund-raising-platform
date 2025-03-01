import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { formatMomentDate } from "../../utils/momentUtil";
import { useParams } from "react-router-dom";
import moment from "moment";

const AdminCampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { userId } = useParams();
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await api.get(`/campaigns/user/${userId}`);
      setCampaigns(response.data);
      const statusResponse = await api.get("/campaignstatuses");
      setStatuses(statusResponse.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleStatusChange = async (id, statusVal) => {
    try {
      const statusObj = statuses.find(
        (status) => status.statusName === statusVal
      );
      if (!statusObj) {
        console.error("Error updating campaign status:");
        return;
      }

      await api.put(`/campaigns/${id}/status`, { statusId: statusObj?.id });
      fetchCampaigns();
    } catch (error) {
      console.error("Error updating campaign status:", error);
    }
  };

  const checkCampaignStatus = (campaign) => {
    const endDate = moment(campaign.endDate);
    const currentDate = moment();
    if (
      campaign.amountRaised >= campaign.amountNeeded ||
      endDate.isBefore(currentDate)
    ) {
      handleStatusChange(campaign.id, "Closed");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">List of Campaigns</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Campaign ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount Needed
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount Raised
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
          {campaigns.map((campaign) => {
            if (campaign?.statusName !== "Closed")
              checkCampaignStatus(campaign); // Check status before rendering
            return (
              <tr key={campaign.id}>
                <td className="px-6 py-4 whitespace-nowrap">{campaign.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatMomentDate(campaign.startDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatMomentDate(campaign.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${campaign.amountNeeded}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${campaign.amountRaised}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Render approve/reject buttons based on status */}
                  {campaign.status === "Pending" && (
                    <>
                      <button
                        className="text-green-500 mr-2"
                        onClick={() =>
                          handleStatusChange(campaign.id, "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() =>
                          handleStatusChange(campaign.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCampaignList;
