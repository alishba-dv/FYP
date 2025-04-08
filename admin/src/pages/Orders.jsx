import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from 'html2canvas';  // Import html2canvas for rendering the component as an image
import  logo from '../assets/logo.png'; // Import your logo image
export const Orders = () => {
  const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    toast.dismiss(); // Clear all previous toasts
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://${host}:8080/api/admin/auth/Orders`, {}, {
          withCredentials: true,
        });
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOrders(response.data.data);
      } catch (error) {
        if (error.response.status == 400) {
          toast.error(`Session expired. `, {
            position: 'top-right',
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
              <a href='/' style={{ color: 'red', textDecoration: 'underline' }}>
                Login
              </a>
            </div>,
            {
              position: 'top-right',
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
        console.error('Error fetching data:', error.message);
        toast.error(' Failed to fetch Orders.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    };
    fetchData();
  }, []);

  const handleDownloadInvoice = async (id) => {
    const invoiceElement = document.getElementById(`invoice-${id}`);
    if (!invoiceElement) return;
  
    const canvas = await html2canvas(invoiceElement, {
      backgroundColor: null,
      scale: 2, // Better quality
    });
  
    const link = document.createElement('a');
    link.download = `invoice-${id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-8 text-red-500'>
        Order <span className='text-black'>List</span>
      </h1>
  
      {orders.length === 0 ? (
        <p className='text-gray-600 text-lg text-center'>No orders found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {orders.map((order) => {
            const totalQuantity = order?.cartItem
              ? Object.keys(order.cartItem).reduce((total, key) => {
                  const item = order.cartItem[key];
                  return total + (item.quantity || 0);
                }, 0)
              : 0;
  
            return (
              <div key={order._id} className='w-full'>
                {/* Invoice Content */}

                 {/* Download button placed OUTSIDE invoice content */}
                 <div className='mt-4 flex justify-center'>
                  <button
                    onClick={() => handleDownloadInvoice(order._id)}
                    className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
                  >
                    Download Invoice
                  </button>
                </div>
                <div
                  id={`invoice-${order._id}`}
                  className='bg-white border p-6 rounded-lg shadow-md text-center space-y-4 w-full'
                >
                  <div className='space-y-4'>
                    {/* Logo and Header */}
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={logo}
                        alt="FurLiva Logo"
                        className="w-20 h-50 object-contain"
                      />
                      <h2 className="text-3xl font-bold text-gray-800">FurLiva</h2>
                      <p className="text-gray-600">Your Purchase Invoice</p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Order ID</h3>
                      <p className='text-lg font-medium text-gray-800 truncate'>{order._id}</p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Customer Name</h3>
                      <p className='text-lg font-medium text-gray-800'>
                        {`${order.firstName || 'N/A'} ${order.lastName || ''}`}
                      </p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Email</h3>
                      <p className='text-lg font-medium text-gray-800 truncate'>{order.email || 'N/A'}</p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Phone</h3>
                      <p className='text-lg font-medium text-gray-800'>{order.phone || 'N/A'}</p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Address</h3>
                      <p className='text-lg font-medium text-gray-800'>
                        {`${order.street || 'N/A'}, ${order.city || ''}`}
                      </p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Total Price</h3>
                      <p className='text-lg font-medium text-gray-800'>RS. {order.total_price.toFixed(2)}</p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Total Quantity</h3>
                      <p className='text-lg font-medium text-gray-800'>{totalQuantity}</p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Order Date</h3>
                      <p className='text-lg font-medium text-gray-800'>
  {new Date(order.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Status</h3>
                      <p
                        className={`inline-flex px-3 py-1 mt-1 ml-[-5px] text-sm font-semibold rounded-lg ${
                          order.payment_status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.payment_status || 'Pending'}
                      </p>
                    </div>
  
                    <div>
                      <h3 className='text-sm font-semibold text-gray-500'>Products</h3>
                      <div className='mt-2 space-y-2'>
                        {order?.cartItem &&
                          Object.keys(order.cartItem).map((key) => {
                            const item = order.cartItem[key];
                            return (
                              <div key={key} className='flex justify-between items-center border-b border-gray-200 pb-2'>
                                <p className='text-sm font-bold text-gray-700'>{item.name}</p>
                                <p className='text-sm text-gray-700'>
                                  {item.quantity} x RS. {item.Price}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
  
               
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}  