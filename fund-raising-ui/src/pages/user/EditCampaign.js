import React, { useState, useEffect } from "react";
import { Form, Button, Message, Container } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

const EditCampaign = () => {
  const { campaignId: id } = useParams();
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    categoryId: "",
    amountNeeded: "",
    startDate: "",
    expiryDate: "",
  });
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [campaignImage, setCampaignImage] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await api.get(`/campaigns/${id}`);
        const campaignData = response.data;
        setCampaign({
          title: campaignData.title,
          description: campaignData.description,
          categoryId: campaignData.categoryId,
          amountNeeded: campaignData.amountNeeded,
          startDate: campaignData.startDate,
          expiryDate: campaignData.expiryDate,
        });
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCampaignDetails();
    fetchCategories();
  }, [id]);

  const handleChange = (e, { name, value }) => {
    setCampaign({ ...campaign, [name]: value });
  };

  const handleFileChange = (e) => {
    setCampaignImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const finalObj = {
      ...campaign,
      userId: user?.id,
      statusId: campaign.statusId,
    };
    try {
      const formData = new FormData();
      formData.append("imageFile", campaignImage);
      formData.append("campaignDto", JSON.stringify(finalObj));

      await api.put(`/campaigns/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      navigate("/user/campaigns");
    } catch (error) {
      setErrorMessage("Failed to update campaign. Please try again.");
      console.error("Error updating campaign:", error);
    }
  };

  return (
    <Container style={{ marginTop: "3em", width: "35%" }}>
      <h2>Update Campaign</h2>
      {errorMessage && (
        <Message negative>
          <Message.Header>{errorMessage}</Message.Header>
        </Message>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Title"
          placeholder="Campaign Title"
          name="title"
          value={campaign.title}
          onChange={handleChange}
          required
        />
        <Form.TextArea
          label="Description"
          placeholder="Campaign Description"
          name="description"
          value={campaign.description}
          onChange={handleChange}
          required
        />
        <Form.Dropdown
          label="Category"
          placeholder="Select Category"
          fluid
          selection
          options={categories.map((category) => ({
            key: category.id,
            text: category.categoryName,
            value: category.id,
          }))}
          name="categoryId"
          value={campaign.categoryId}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Amount Needed"
          type="number"
          placeholder="Amount Needed"
          name="amountNeeded"
          value={campaign.amountNeeded}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Start Date"
          type="date"
          name="startDate"
          value={campaign.startDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]} // Set min date to today
          required
        />
        <Form.Input
          label="Expiry Date"
          type="date"
          name="expiryDate"
          value={campaign.expiryDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]} // Set min date to today
          required
        />
        <Form.Field>
          <label>Campaign Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Field>
        <Button primary type="submit">
          Update Campaign
        </Button>
      </Form>
    </Container>
  );
};

export default EditCampaign;
