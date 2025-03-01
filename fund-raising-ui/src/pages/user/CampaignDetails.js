import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardType: "",
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [donations, setDonations] = useState([]);
  const { user, isDonor } = useAuth();
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchCampaignDetails();
    fetchDonations();
  }, [campaignId]);

  const fetchCampaignDetails = async () => {
    try {
      const statusResponse = await api.get("/campaignstatuses");
      setStatuses(statusResponse.data);

      const response = await api.get(`/campaigns/${campaignId}`);
      setCampaign(response.data);
      if (response.data?.statusName !== "Closed") checkCampaignStatus(campaign); // Check status before rendering
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await api.get(`/donations/campaign/${campaignId}`);
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handlePayment = async () => {
    if (
      !paymentAmount ||
      !cardDetails.cardType ||
      !cardDetails.cardNumber ||
      !cardDetails.cardName ||
      !cardDetails.expiryMonth ||
      !cardDetails.expiryYear ||
      !cardDetails.cvv
    ) {
      setPaymentMessage("Please fill in all payment details.");
      return;
    }

    try {
      const paymentData = {
        ...cardDetails,
        amount: paymentAmount,
        campaignId: campaignId,
        date: moment().format("MM-DD-YYYY"),
        method: "card",
        donorName: user?.firstName + " " + user?.lastName,
        donorId: user?.id,
      };

      const payload = {
        donorName: user?.firstName + " " + user?.lastName,
        donorId: user?.id,
        amount: paymentAmount,
        campaignId: campaignId,
        paymentData,
        status: "Completed",
        date: moment().format("MM-DD-YYYY"),
      };

      await api.post("/donations", payload);
      setPaymentAmount(0);
      setCardDetails({
        cardType: "",
        cardNumber: "",
        cardName: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
      });
      setPaymentSuccess(true);
      fetchCampaignDetails();
      fetchDonations();
      setPaymentMessage("Payment successful!");
      setTimeout(() => {
        setPaymentMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error making payment:", error);
      setPaymentMessage("Payment failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  //   const handleWithdrawDonation = async (donationId) => {
  //     try {
  //       await api.delete(`/donations/${donationId}`);
  //       // Refresh donations list after withdrawal
  //       const response = await api.get(`/donations/${campaignId}`);
  //       setDonations(response.data);
  //     } catch (error) {
  //       console.error("Error withdrawing donation:", error);
  //     }
  //   };

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
    } catch (error) {
      console.error("Error updating campaign status:", error);
    }
  };

  const checkCampaignStatus = (campaign) => {
    const endDate = moment(campaign.expiryDate);
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
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          {campaign ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">{campaign?.title}</h2>
              {campaign.photoUrl && (
                <img
                  src={
                    campaign.photoUrl
                      ? require(`../../images/campaign/${campaign.photoUrl}`)
                      : require(`../../images/campaign/default.jpeg`)
                  }
                  alt={campaign.title}
                  className="w-full mb-4 rounded-lg"
                />
              )}
              <p className="text-gray-600 mb-6">{campaign?.description}</p>
              <p className="text-gray-600 mb-6">
                Amount Raised: ${campaign?.amountRaised}
              </p>
              <p className="text-gray-600 mb-6">
                Amount Needed: ${campaign?.amountNeeded}
              </p>
              <p className="text-gray-600 mb-6">
                Category: {campaign?.categoryName}
              </p>
              <p className="text-gray-600 mb-6">
                Status: {campaign?.statusName}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {isDonor() && campaign?.statusName === "Approved" && (
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Make Payment</h2>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Enter Payment Amount:
              </label>
              <input
                type="number"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Card Type:
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                name="cardType"
                value={cardDetails.cardType}
                onChange={handleChange}
              >
                <option value="">Select Card Type</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Card Number:
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Card Holder Name:
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Expiry Month:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="expiryMonth"
                  value={cardDetails.expiryMonth}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Expiry Year:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="expiryYear"
                  value={cardDetails.expiryYear}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                CVV:
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePayment}
            >
              Make Payment
            </button>
            {paymentMessage && (
              <p className={paymentSuccess ? "text-green-500" : "text-red-500"}>
                {paymentMessage}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Donations</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.map((donation) => (
              <tr key={donation?.id}>
                <td className="px-6 py-4 whitespace-nowrap">{donation?.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${donation?.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(donation?.date).format("MMMM DD, YYYY")}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-500"
                    onClick={() => handleWithdrawDonation(donation.id)}
                  >
                    Withdraw
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignDetails;
