import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get("/campaigns");
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await api.get("/campaignstatuses");
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchCampaigns();
    fetchStatuses();
  }, []);

  const getStatusName = (statusId) => {
    const status = statuses.find((status) => status.id === statusId);
    return status ? status.statusName : "Unknown";
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-30%">
        <input
          type="text"
          style={{ width: "30%" }}
          placeholder="Search by title"
          className="w-full border border-gray-300 rounded-md p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns
          .filter(
            (campaign) =>
              campaign.statusName === "Approved" ||
              campaign.statusName === "Closed"
          )
          .map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={
                  campaign.photoUrl
                    ? require(`../../images/campaign/${campaign.photoUrl}`)
                    : require(`../../images/campaign/default.jpeg`)
                }
                alt={campaign.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold mb-2">{campaign.title}</h2>
              <p className="text-gray-600 mb-4">{campaign.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  Amount Raised: ${campaign.amountRaised}
                </span>
                <span className="text-gray-700">
                  Amount Needed: ${campaign.amountNeeded}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-gray-700">
                  Status: {getStatusName(campaign.statusId)}
                </span>
              </div>
              <div className="mt-4">
                <Link
                  to={`/campaigns/${campaign.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CampaignsList;
