# Fundraising Platform

## 📌 Overview
The **Fundraising Platform** is a **full-stack web application** that enables users to **create, manage, and contribute to fundraising campaigns**. Designed for **transparency, accountability, and ease of use**, this platform connects donors directly with those in need, eliminating intermediaries.  

## 🚀 Features  
- **User Authentication** – Secure sign-up and login functionality.  
- **Campaign Creation & Management** – Users can create campaigns with details, categories, and images.  
- **Admin Approval System** – Campaigns undergo admin verification before becoming publicly visible.  
- **Donation System** – Users can contribute to campaigns with a secure payment gateway.  
- **Refund & Campaign Extension** – Donors can request refunds before campaign closure; users can request date extensions.  
- **Real-Time Campaign Tracking** – Tracks amount raised, status, and expiration date dynamically.  

## 🛠 Tech Stack  
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Deployment:** AWS  

## 📂 Database Schema  
The platform utilizes a **structured MongoDB database** with the following collections:  
- **Users** – Stores user details and authentication data.  
- **Donors** – Maintains donor records.  
- **Campaigns** – Tracks campaign details, funding goals, and status.  
- **Donations** – Stores transactions and donation history.  
- **Payments** – Handles secure payments and refunds.  

## 🏗 Setup & Installation  
1. **Clone the Repository**  
   ```sh
   git clone https://github.com/yourusername/fundraising-platform.git
   cd fundraising-platform