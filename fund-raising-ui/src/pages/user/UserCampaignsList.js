import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import api from "../../utils/api";
import { formatMomentDate } from "../../utils/momentUtil";
import { useAuth } from "../../contexts/AuthContext";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function
  const [statuses, setStatuses] = useState([]);
  const { user, isUser } = useAuth();

  useEffect(() => {
    // Fetch campaigns from API when component mounts
    const fetchCampaigns = async () => {
      try {
        const response = await api.get(`/campaigns/user/${user?.id}`);
        setCampaigns(response.data);

        const statusResponse = await api.get("/campaignstatuses");
        setStatuses(statusResponse?.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  // Function to handle navigation to create campaign page
  const handleCreateCampaign = () => {
    navigate("/user/campaigns/create");
  };

  const handleEditCampaign = (id) => {
    navigate(`/user/campaigns/${id}/edit`);
  };

  if ((isUser() && user?.status === "Pending") || user?.status === "Rejected")
    return (
      <Container style={{ marginTop: "3em" }}>
        <h1> Admin needs to approve to create a campaign</h1>
      </Container>
    );

  return (
    <Container style={{ marginTop: "3em" }}>
      <Button primary onClick={handleCreateCampaign}>
        Create Campaign
      </Button>{" "}
      {/* Add onClick handler */}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {campaigns.map((campaign) => {
            const statusName = (statuses || []).find(
              (status) => status.id === campaign.status
            );
            return (
              <>
                <Table.Row key={campaign.id}>
                  <Table.Cell>{campaign.title}</Table.Cell>
                  <Table.Cell>{campaign.description}</Table.Cell>
                  <Table.Cell>
                    {formatMomentDate(campaign.startDate)}
                  </Table.Cell>
                  <Table.Cell>
                    {formatMomentDate(campaign.expiryDate)}
                  </Table.Cell>
                  <Table.Cell>{campaign.categoryName}</Table.Cell>
                  <Table.Cell>{campaign.statusName}</Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button
                        primary
                        onClick={() => handleEditCampaign(campaign.id)}
                      >
                        Edit Campaign
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default CampaignList;
