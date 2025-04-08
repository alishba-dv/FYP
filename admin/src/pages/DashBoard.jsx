import React, { useEffect, useState } from 'react';
import { useRef } from "react";

import { NavLink } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as  ChartJS,ArcElement ,CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement);

export const DashBoard = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const chartRef = useRef(null);
  const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
const [cardsData, setCardsData] = useState({
    totalOrders: 0,
    registeredUsers: 0,
    totalProducts: 0,
    totalIncome: 0,
  });
  const [orders, setOrders] = useState([]);
    const [tableorders, settableOrders] = useState([]);
    useEffect(() => {
      toast.dismiss(); // Clear all previous toasts
    }, []);
  // Fetch dashboard data
  useEffect(() => {


    const fetchData = async () => {
      try {
        // Fetch orders

        const response = await axios.post(
            `http://${host}:8080/api/admin/auth/Orders`,
            {},
            {
               withCredentials:true, 
            }
        );
        console.log("Response: ", response.data.data);

        // ✅ Extract the array from the API response
        const data = response.data.data;

        // ✅ Process data for cards
        const totalOrders = data.length; // Total number of orders

        const registeredUsers = new Set(data.map(order => order.email)).size; // Unique users by email

         const productsResponse =await axios.post(
					`http://${host}:8080/api/admin/auth/List`,
					{},
					{
						withCredentials:true, 
					}
				);

  //       toast.success(productsResponse.data.message, {
  //         position: 'top-right',
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         theme: 'colored',
  // // style: { marginRight: '100px' },
  //     });




      const productsData = (productsResponse.data.data); // Array of products
      console.log('Products Response:', productsData);

      // ✅ Process data for cards
      const totalProducts = productsData.length; // Total products from product list API

        const totalIncome = data.reduce((acc, order) => acc + parseFloat(order.total_price), 0).toFixed(2); // Sum of total price

        // ✅ Update the state with the calculated data
        setCardsData({ totalOrders, registeredUsers,totalProducts,totalIncome });
        const limitedOrders=data.slice(0,5)
        setOrders(data);
        settableOrders(limitedOrders);
      } catch (err) {
        if (err.response && err.response.status === 400) {
					// localStor    // age.clear();

					toast.error(`Session expired. Please Login again`, {
						position: 'top-right',
						// style: { marginRight: '100px' },
						autoClose: false,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: 'colored',
					});

					toast.info(
						<div>
							Login Here!{' '}
							<a
								href='/'
								style={{ color: 'red', textDecoration: 'underline' }}>
								Login
							</a>
						</div>,
						{
							position: 'top-right',
							autoClose: false, // Auto-dismiss after 5 seconds
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
						}
					);
				}
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  // Card data structure

  const cards = [
      {
          title: 'Total Orders',
          count: cardsData.totalOrders.toLocaleString(),
          color: 'bg-purple-500',
          icon: <FaShoppingCart />,
          trend: cardsData.ordersTrend, // Example: +12%
      },
      {
          title: 'Registered Users',
          count: cardsData.registeredUsers.toLocaleString(),
          color: 'bg-red-500',
          icon: <FaUsers />,
          trend: cardsData.usersTrend, // Example: -5%
      },
      {
          title: 'Total Products',
          count: cardsData.totalProducts.toLocaleString(),
          color: 'bg-blue-500',
          icon: <FaBoxOpen />,
          trend: cardsData.productsTrend, // Example: +8%
      },
      {
          title: 'Total Income',
          count: `$${cardsData.totalIncome.toLocaleString()}`,
          color: 'bg-green-500',
          icon: <FaDollarSign />,
          trend: cardsData.incomeTrend, // Example: +20%
      },
  ];
  

  // Chart data
  
  const filterOrders = () => {
    let filteredOrders = [...orders];
  
    const today = new Date();
  
    if (timeframe === 'weekly') {
      filteredOrders = orders.slice(-7); // Last 7 days
    } else if (timeframe === 'daily') {
      filteredOrders = orders.slice(-1); // Last day
    } else if (timeframe === 'monthly') {
      filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        const pastMonth = new Date();
        pastMonth.setDate(today.getDate() - 30); // 30 days ago
  
        return orderDate >= pastMonth;
      });
    }

    else if (timeframe === 'yearly') {
      filteredOrders = orders.slice(-365); // Last year
    }
  
    return filteredOrders;
  };
  
  
  const filteredData = filterOrders();
  
  const chartData = {
    labels: filteredData.map(order => new Date(order.date).toLocaleDateString()),
    datasets: [
      {
        label: `Order Total ($) - ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}`,
        data: filteredData.map(order => parseFloat(order.total_price)),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };
  
  
  const DownloadChart = () => {
    const chartInstance = chartRef.current?.chartInstance || chartRef.current;
    if (!chartInstance) {
      console.error("Chart reference is null.");
      return;
    }
  
    const chartCanvas = chartInstance.canvas;
    if (!chartCanvas) {
      console.error("Chart canvas is null.");
      return;
    }
  
    // Create an offscreen canvas with a white background
    const offscreenCanvas = document.createElement("canvas");
    const ctx = offscreenCanvas.getContext("2d");
  
    offscreenCanvas.width = chartCanvas.width;
    offscreenCanvas.height = chartCanvas.height;
  
    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  
    // Draw the chart on top of the white background
    ctx.drawImage(chartCanvas, 0, 0);
  
    // Convert to image
    const image = offscreenCanvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "chart.png";
    link.click();
  };
  


  
  const chartOptions = {
    
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 18, // Increase legend font size (e.g., "Order Total")
          },
        },
      },
      title: {
        display: true,
        text: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Sales Overview`, // Capitalize the first letter
        font: {
          size: 22, // Increase chart title font size
        },
      },
      tooltip: {
        titleFont: {
          size: 20, // Increase title font size
        },
        bodyFont: {
          size: 20, // Increase body text font size
        },
        footerFont: {
          size: 20, // Optional: Footer text size
        },
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };


  
  return (
    <div className="min-h-screen bg-white-100 p-10">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-bold mb-8">
  <span className="text-red-500">Admin</span> Dashboard
</h1>


      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {cards.map((card, index) => (
          <div key={index} className={`flex items-center p-6 rounded-lg shadow-lg text-white ${card.color}`}>
            <div className="text-5xl">{card.icon}</div>
            <div className="ml-6">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-3xl mt-2">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex gap-4">
  <button onClick={() => setTimeframe('daily')} className="bg-blue-500 text-white px-4 py-2 rounded">Daily</button>
  <button onClick={() => setTimeframe('weekly')} className="bg-green-500 text-white px-4 py-2 rounded">Weekly</button>
  <button onClick={() => setTimeframe('monthly')} className="bg-purple-500 text-white px-4 py-2 rounded">Monthly</button>
  <button onClick={() => setTimeframe('yearly')} className="bg-purple-500 text-white px-4 py-2 rounded">Yearly</button>
 
  <button
    onClick={DownloadChart}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
  >
    📊 Download Chart
  </button>

</div>



      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sales Chart</h2>

        
        <div style={{ height:"50%", width: "100%" }}>
  <Bar ref={chartRef} data={chartData} options={chartOptions} />
</div>


      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Orders</h2>
          <NavLink to="/order">
            <button className="bg-[#F24C4C] text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
              View All
            </button>
          </NavLink>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 text-left">Order ID</th>
                                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Payment Method</th>
                <th className="p-4 text-left">Order Date</th>

                <th className="p-4 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {tableorders.map((order, index) => (
                <tr key={order.id} className={`border-t ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="p-4">{order._id}</td>
                                                  <th className="p-4 text-left">{order.email}</th>

                  <td className="p-4">{order.payment_status}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};



