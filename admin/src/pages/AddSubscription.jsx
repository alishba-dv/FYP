import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const AddSubscription = () => {
  const { setPackages, editSubscription } = useOutletContext();
  const navigate = useNavigate();
  const { search } = useLocation();
  const edit = useMemo(() => search?.split("=")[1] === "true", [search]);
const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
  useEffect(() => {
    toast.dismiss(); // Clear all previous toasts
  }, []);

  useEffect(() => {
    if (edit && !editSubscription) {
      navigate("/subscription");
    }
  }, [edit]);

  const [name, setName] = useState(edit ? editSubscription?.name ?? "" : "");
  const [price, setPrice] = useState(edit ? editSubscription?.price ?? "" : "");
  const [timeFrame, timeFrameSet] = useState(edit ? editSubscription?.timeFrame ?? "" : "");
  const [features, setFeatures] = useState(edit ? editSubscription?.features ?? ["New Feature"] : ["New Feature"]);
  const [productModalOpen, productModalOpenSet] = useState(false);
  const [products, productsSet] = useState([]);
  const [productGroup, productGroupSet] = useState(edit ? editSubscription?.productGroup ?? [] : []);
  const [autoRenew, setAutoRenew] = useState(edit ? editSubscription?.autoRenew ?? false : false); // Auto-renew state

  const toggleProductModal = () => productModalOpenSet(pre => !pre);

  useEffect(() => {
    getProducts();
  }, []);

  const [isLoading, isLoadingSet] = useState(false);

  // Update a specific feature by index
  const handleFeatureChange = (index, value) => {
    setFeatures(prevFeatures => prevFeatures.map((feature, i) => (i === index ? value : feature)));
  };

  // Add a new feature
  const addFeature = () => {
    setFeatures(prevFeatures => [...prevFeatures, "New Feature"]);
  };

  // Remove a feature by index
  const removeFeature = index => {
    if (features.length > 1) {
      setFeatures(prevFeatures => prevFeatures.filter((_, i) => i !== index));
    }
  };

  const removeProductGroupItem = index => {
    productGroupSet(pre => pre.filter((_, i) => i !== index));
  };

  async function getProducts() {
    try {
      const response = await axios.get(`http://${host}:8080/api/auth/subscription/products`, {
        withCredentials:true,
      });
      if (response?.data) {
        productsSet(response.data.products);
      }
    } catch (err) {}
  }

  async function createSubscription() {
    if (!name || !price || !features.length || !productGroup.length) {
      toast.error("Fill the remaining fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    isLoadingSet(true);
    const body = {
      name,
      price,
      features,
      productGroup,
      timeFrame,
      autoRenew, // Include autoRenew in the request body
    };
    try {
      if (edit) {
        const response = await axios.put(`http://${host}:8080/api/auth/subscription/${editSubscription._id}`, body, {
          withCredentials:true,
        });
        if (response?.data) {
          toast.success("Subscription edited successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setPackages(prevPackages => prevPackages.map(pkg => (pkg._id === response.data.subscription._id ? response.data.subscription : pkg)));
          navigate("/subscription");
        }
      } else {
        const response = await axios.post(`http://${host}:8080/api/auth/subscription`, body, {
          withCredentials:true,
        });
        if (response?.data) {
          toast.success("Subscription created successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setPackages(pre => [...pre, response.data.subscription]);
          navigate("/subscription");
        }
      }
    } catch (err) {
      toast.error("Error in creating subscription", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      isLoadingSet(false);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg max-w-lg mx-auto p-6 border border-gray-200 sm:min-w-[450px] flex flex-col gap-4">
      <div className="flex gap-1 items-center">
        <button onClick={() => navigate("/subscription")} className="p-2">
          <IoArrowBackOutline className="size-8" color="#ef4444" />
        </button>
        <h2 className="text-2xl font-semibold text-red-500">
          {edit ? "Edit" : "Add"} <span className="text-black">Subscription</span>
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-600">Name</p>
          <input
            type="text"
            placeholder="Subscription name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-600">Price</p>
          <input
            type="number"
            placeholder="30"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="w-full">
          <p className="mb-2 font-medium  text-gray-600">Payment Time Frame</p>
          <select className="w-full px-4 py-2 border h-[42px] rounded-lg" value={timeFrame} onChange={e => timeFrameSet(e.target.value)}>
            {["daily","Weekly", "Monthly", "Yearly"].map((time, i=0) => {
              return (
                <option value={time} key={i}>
                  {time}
                </option>
              );
            })}
          </select>
        </div>

        {/* Auto Renew Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={autoRenew}
            onChange={() => setAutoRenew(!autoRenew)}
            className="w-4 h-4"
          />
          <label className="text-gray-600">Auto Renew</label>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="mb-2 font-medium text-gray-600">Features</p>
            <button onClick={() => addFeature()} className="text-green-500">
              ➕ Add Feature
            </button>
          </div>
          <ul>
            {features?.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 mb-3">
                <input
                  type="text"
                  value={feature}
                  required
                  onChange={e => handleFeatureChange(index, e.target.value)}
                  className="text-lg w-full border p-2 rounded-lg focus:outline-none"
                />
                <button onClick={() => removeFeature(index)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center justify-between">
            <p className="mb-2 font-medium text-gray-600">Product Group</p>
            <button onClick={toggleProductModal} className="text-green-500">
              ➕ Add Group
            </button>
          </div>
          <ul className="p-2">
            {productGroup?.map((prod, index) => (
              <li key={index} className="border-b border-b-gray-200 flex items-center gap-3 mb-3">
                <div className="text-lg w-full p-2 rounded-lg focus:outline-none">{prod.name}</div>
                <button onClick={() => removeProductGroupItem(index)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                  ❌
                </button>
              </li>
            ))}
          </ul>

          {/** MODAL */}
          {productModalOpen && (
            <ProductModal
              open={productModalOpen}
              openSet={productModalOpenSet}
              products={products}
              productGroup={productGroup}
              productGroupSet={productGroupSet}
            />
          )}
        </div>
        <button onClick={createSubscription} className="mt-4 w-full py-3 bg-red-500 hover:bg-gray-600 text-white font-bold rounded-lg">
          {isLoading ? (edit ? "Editing ..." : "Adding ...") : `${edit ? "Edit" : "Add"} Subscription`}
        </button>
      </div>
    </div>
  );
};

export default AddSubscription;

function ProductModal({ open, openSet, products, productGroupSet }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        openSet(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const [groupName, groupNameSet] = useState("");
  const [selectedProducts, selectedProductsSet] = useState([]);

  function productSelect(productId) {
    selectedProductsSet(prev => (prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]));
  }

  function save() {
    if (!groupName || !selectedProducts.length) {
      toast.error("GroupName or selected Products mustn't be empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    productGroupSet(pre => [...pre, { name: groupName, products: selectedProducts }]);
    openSet(false);
  }

  return (
    <div ref={modalRef} onSubmit={save} className={"absolute left-0 right-0 bg-white shadow-lg rounded-lg border p-3 flex flex-col gap-4"}>
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between">
          <p className="mb-2 font-medium text-gray-600">Group Name</p>
        </div>
        <input
          type="text"
          placeholder="Enter Group Name"
          value={groupName}
          onChange={e => groupNameSet(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="mb-2 font-medium text-gray-600">Select Products</p>
        </div>

        <div className="border rounded-lg p-1 flex flex-col gap-1 items-center max-h-96 overflow-auto">
          {products.map((prod, index) => {
            const isSelected = selectedProducts.includes(prod._id);
            return (
              <div
                key={index}
                onClick={() => productSelect(prod._id)}
                className={`${
                  isSelected ? "bg-gray-200" : "bg-white"
                } w-full rounded-lg flex items-center py-1 px-3 cursor-pointer hover:bg-gray-300 transition-colors justify-between`}
              >
                <div>{prod.name}</div>
                <div className="bg-green-500 rounded-lg p-1">{prod.Animal_Category}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button type="submit" onClick={save} className="bg-red-500 text-white w-full p-2 rounded-lg mt-2">
        Save
      </button>
    </div>
  );
}