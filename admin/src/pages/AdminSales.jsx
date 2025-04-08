import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminSales = () => {
  const [sales, setSales] = useState([]);
  const [editingSale, setEditingSale] = useState(null);
  const [editedSaleData, setEditedSaleData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  const [newSale, setNewSale] = useState({
    saleName: '',
    discountPercentage: 0,
    startDate: '',
    endDate: '',
    isActive: true,
  });

  // Fetch sales
  const fetchSales = async () => {
    try {
      const response = await axios.get(`http://${host}:8080/api/admin/sales/`);
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Create new sale
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${host}:8080/api/admin/sales/create`, newSale);
    //   setSales((prevSales) => [...prevSales, response.data.sale]);
      toast.success('Sale created successfully!');
    } catch (error) {
      console.error('Error creating sale:', error);
      toast.error('Error creating sale.');
    }
  };

  // Update sale
  const handleUpdateSale = async (updatedSale) => {
    try {
      await axios.put(`http://${host}:8080/api/admin/sales/update/${updatedSale._id}`, updatedSale);
      toast.success('Sale updated successfully!');
      setShowEditModal(false);
      fetchSales();
    } catch (error) {
      console.error('Error updating sale:', error);
      toast.error('Failed to update sale.');
    }
  };
  const handleDeleteSale = (saleId) => {
    toast.info(
      ({ closeToast }) => (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center w-full max-w-md">
          <div className="text-4xl text-red-500 mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-red-600 mb-1">Confirm Deletion</h3>
          <p className="text-gray-700 text-sm mb-4">
            Are you sure you want to delete this sale?
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={async () => {
                try {
                  await axios.delete(`http://${host}:8080/api/admin/sales/delete/${saleId}`);
                  setSales((prevSales) => prevSales.filter((sale) => sale._id !== saleId));
                  toast.success('Sale deleted successfully');
                  closeToast();
                } catch (error) {
                  console.error('Error deleting sale:', error);
                  toast.error('Failed to delete sale');
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="bg-white border border-red-500 text-red-500 hover:bg-red-50 font-medium px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        theme: 'light',
        icon: false // 🔥 This disables the default ℹ️ icon
      }
    );
     
}
return (
    <div className="admin-sales container mx-auto p-8">
<h1 className="text-3xl sm:text-4xl font-bold mb-8 text-red-500 ">
          Admin<span className="text-black"> Sales</span>
        </h1>
      {/* Create Sale Form */}
      <div className="create-sale-form mb-8">
      <h3 className='text-2xl sm:text-4xl text-red-500 font-semibold'>
				Launch  <span className='text-black'>Promotion</span>
			</h3>        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Sale Name"
            value={newSale.saleName}
            onChange={(e) => setNewSale({ ...newSale, saleName: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            value={newSale.discountPercentage}
            onChange={(e) => setNewSale({ ...newSale, discountPercentage: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <input
            type="date"
            value={newSale.startDate}
            onChange={(e) => setNewSale({ ...newSale, startDate: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <input
            type="date"
            value={newSale.endDate}
            onChange={(e) => setNewSale({ ...newSale, endDate: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newSale.isActive}
              onChange={(e) => setNewSale({ ...newSale, isActive: e.target.checked })}
            />
            Active Sale
          </label>
          <button type="submit" className="px-6 py-2 bg-red-500 text-white rounded-full w-full">
            Create Sale
          </button>
        </form>
      </div>

      {/* Sales List */}
      <div className="sales-list">
      <h1 className='text-2xl sm:text-4xl text-red-500 font-semibold'>
      Current  <span className='text-black'>Promotion</span>   </h1>
           {sales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sales.map((sale) => (
              <div key={sale._id} className="sale-card bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-red-500">{sale.saleName}</h2>
                <p className="text-lg text-black-500"><strong>Discount:</strong> {sale.discountPercentage}%</p>
                <p className="text-lg text-black-500"><strong>Active:</strong> {sale.isActive ? 'Yes' : 'No'}</p>
                <p className="text-lg text-black-500">
                  <strong>Start Date:</strong> {new Date(sale.startDate).toLocaleDateString()}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>End Date:</strong> {new Date(sale.endDate).toLocaleDateString()}
                </p>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setEditingSale(sale);
                      setEditedSaleData(sale);
                      setShowEditModal(true);
                    }}
                    className="text-red-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSale(sale._id)}
                    className="text-black-500 "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">No sales available.</p>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Sale</h2>
            <input
              type="text"
              value={editedSaleData.saleName || ''}
              onChange={(e) =>
                setEditedSaleData({ ...editedSaleData, saleName: e.target.value })
              }
              placeholder="Sale Name"
              className="border p-2 w-full mb-4"
            />
            <input
              type="number"
              value={editedSaleData.discountPercentage || ''}
              onChange={(e) =>
                setEditedSaleData({ ...editedSaleData, discountPercentage: e.target.value })
              }
              placeholder="Discount %"
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateSale(editedSaleData)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
