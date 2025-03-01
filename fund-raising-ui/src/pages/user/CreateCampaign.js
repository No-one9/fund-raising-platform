import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Message, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Layout from "../layout/Layout";
import { useAuth } from "../../contexts/AuthContext";

const CreateCampaign = () => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    categoryId: "",
    amountNeeded: "",
    startDate: "",
    expiryDate: "",
  });
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaignImage, setCampaignImage] = useState(null);

  console.log(user);

  useEffect(() => {
    const fetchCategoriesAndStatuses = async () => {
      try {
        const categoriesResponse = await api.get("/categories");
        const statusesResponse = await api.get("/campaignstatuses");
        setCategories(categoriesResponse.data);
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error("Error fetching categories and statuses:", error);
      }
    };
    fetchCategoriesAndStatuses();
  }, []);

  const handleChange = (e, { name, value }) => {
    setCampaign({ ...campaign, [name]: value });
  };

  const handleSubmit = async () => {
    const status = statuses.find((status) => status.statusName === "Pending");
    const finalObj = { ...campaign, userId: user?.id, statusId: status?.id };
    try {
      const formData = new FormData();
      formData.append("imageFile", campaignImage);
      formData.append("campaignDto", JSON.stringify(finalObj));

      await api.post("/campaigns", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });

      //await api.post("/campaigns", campaign);
      navigate("/user/campaigns");
    } catch (error) {
      setErrorMessage("Failed to create campaign. Please try again.");
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <Container style={{ marginTop: "3em", width: "35%" }}>
      <h2>Create a Campaign</h2>
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCampaignImage(e.target.files[0])}
          />
        </Form.Field>
        <Button primary type="submit">
          Create Campaign
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCampaign;
