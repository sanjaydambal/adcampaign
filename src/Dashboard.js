import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Import the required icons from react-icons
import { FaFacebook, FaPhone, FaYelp, FaUserFriends } from 'react-icons/fa';

// Custom MicrosoftIcon Component
const MicrosoftIcon = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
    alt="Microsoft Logo"
    className="w-8 h-8"  // Adjust size as needed
  />
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!dashboardData) {
    return <div className="text-lg text-gray-600 p-8">Loading...</div>;
  }

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Booked Leads" value={dashboardData.bookedLeads} icon={<FaUserFriends />} info="Engagement" />
      <Card title="Ad Spend" value={`$${dashboardData.adSpendMicrosoft}`} icon={<MicrosoftIcon />} info="Microsoft Ads" />
      <Card title="Clicks" value={dashboardData.clicksMicrosoft} icon={<MicrosoftIcon />} info="Microsoft Ads" />
      <Card title="Clicks - Calls" value={dashboardData.clicksCalls || "No data"} icon={<FaPhone />} info="Google Business Profile" />
      <Card title="Ad Spend" value={`$${dashboardData.adSpendFacebook}`} icon={<FaFacebook />} info="Facebook Ads" />
      <Card title="Check-ins" value={dashboardData.checkinsFacebook} icon={<FaFacebook />} info="Facebook Ads" />
      <Card title="Ad Spend" value={`$${dashboardData.adSpendYelp}`} icon={<FaYelp className="text-red-600" />} info="Yelp Campaign Performance" />
    </div>
  );
};

// Card Component with Enhanced Design
const Card = ({ title, value, icon, info }) => {
  // Check if the value contains a dollar sign and format accordingly
  const formattedValue = typeof value === 'string' && value.startsWith('$')
    ? (
      <div className="flex items-center ">
        <span className="text-2xl text-gray-500 mr-1 font-semibold">$</span>
        <span className="text-3xl font-bold text-gray-600">{value.slice(1)}</span>
      </div>
    )
    : <span className="text-3xl font-bold text-gray-600">{value}</span>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between space-y-2 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-normal items-center gap-3">
        <div className="text-4xl text-blue-600">{icon}</div>
        <div className='flex flex-col-reverse'>
          <div className="text-sm text-black-400 opacity-75">{info}</div>
          <div className="text-lg text-black-400 font-semibold">{title}</div>
        </div>
      </div>
      <div className="text-left ml-10">
        {formattedValue}
      </div>
    </div>
  );
};

export default Dashboard;
