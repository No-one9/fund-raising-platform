import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import HomeImage from "../../images/home1.jpeg";

const Homepage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Welcome to the Fundraising Platform
          </h1>
          <p className="text-lg text-gray-700 mb-6 md:mb-8">
            Start making a difference today! Our platform connects donors,
            campaigners, and causes, making it easy to support the causes you
            care about.
          </p>
          {isAuthenticated() ? (
            <Link to="/create-campaign">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Start a Campaign
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Sign In to Start
              </button>
            </Link>
          )}
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src={HomeImage}
            alt="Fundraising Platform"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
