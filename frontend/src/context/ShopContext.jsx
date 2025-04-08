import { createContext, useEffect, useState } from "react";
import { product } from "../assets/assests";
import { accessoriesProduct } from "../assets/assests";
import { medicineProducts } from "../assets/assests";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // Importing the js-cookie library

const ShopContextProvider = props => {
  const currency = "Rs";
  const [discount, setdiscount] = useState(0); // Default value set to 190
  // const [finalTotalShop, setFinalTotalShop] = useState(0); // New state variable to hold final total value
 
  const [delivery_fee, setDelivery_fee] = useState(190); // Default value set to 190
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [product, setProduct] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);  // Add cartAmount state

  const [user, userSet] = useState(Cookies.get('curr_Name')); // Check if token exists in cookies

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  //  whenever cartItem changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  // Helper function to fetch product by ID
  const getProductById = async (id, type) => {
    try {
      let productData = null;
      id = id.toString(); // Ensure id is string for comparison

      if (type === "product") {
        let product = await axios.post("http://localhost:8080/api/collection");
        setProduct(product.data.data);
        productData = product.data.data.find(p => p._id === id);
        console.log("productData..", productData);
      } else if (type === "accessoriesProduct") {
        const accessoriesProduct = await axios.post("http://localhost:8080/api/Accessories");
        productData = accessoriesProduct.data.data.find(p => p._id === id);
      } else if (type === "medicineProducts") {
        const medicineProducts = await axios.post("http://localhost:8080/api/Medicines");
        productData = medicineProducts.data.data.find(p => p._id === id);
      }

      console.log("Product Data top: ", productData);

      return productData || null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  };

  // Add item to cart
  const addToCart = async ({ itemId, itemData, type }) => {
    const productDetails = await getProductById(itemId, type);

    console.log("PDTAILS: ", productDetails);
    setProductData(productDetails);
    if (!productDetails) {
      console.error(`Product not found for ID ${itemId} and type ${type}`);
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      cartData[itemId].quantity += 1;
    } else {
      cartData[itemId] = {
        image: productDetails.image,
        name: productDetails.name,
        quantity: 1,
        Price: productDetails.price,
        type,
      };
    }
    toast.success("Item added in cart successfully", {
      position: "top-right",
      style: { marginRight: "100px" },

      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    console.log("Cart data from shopconetxt.jsx: ", { cartData });

    setCartItem(cartData);
  };

  const getItemCount = () => {
    let total = 0;

    for (const key in cartItem) {
      if (cartItem[key] && cartItem[key].quantity > 0) {
        total += cartItem[key].quantity;
      }
    }
    console.log("Total quantity: ", total);
    return total;
  };

  // Example in ShopContext.js
  const updateQuantity = (_id, quantity) => {
    setCartItem(prevCartItem => {
      const updatedCart = { ...prevCartItem };
  
      if (quantity > 0) {
        updatedCart[_id] = {
          ...updatedCart[_id],
          quantity: quantity,
        };
      } else {
        delete updatedCart[_id]; // 🧹 Remove item completely if quantity is 0
      }
  
      return updatedCart;
    });
  };
  
  const getCartAmount = async () => {
    let total = 0;

    // Loop through the cartItem object
    for (const key in cartItem) {
      console.log("Cart item in getcartamount: ", cartItem);
      try {
        // Find the corresponding product for the cart item

        console.log("PData", productData);
        if (productData && cartItem[key].quantity > 0) {
          // Calculate total by multiplying quantity by the product's price
          total += cartItem[key].quantity * cartItem[key].Price;
          console.log("Total here: ", total);
        }

        console.log("Total price: ", cartItem[key].quantity);
      } catch (e) {
        console.error(`Error calculating total for key ${key}:`, e);
      }
    }
    console.log("Total: ", total);
    return total;
  };

  function login(user) {
    console.log({ user });
    userSet(user);
  }

  function logout() {
    userSet(null);
  }

  const value = {
    product,
    accessoriesProduct,
    medicineProducts,
    currency,
    delivery_fee,
    setDelivery_fee,
    navigate,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getItemCount,
    updateQuantity,
    getCartAmount,
    getProductById,
    login,
    logout,
    isLoggedIn: user,
    discount,setdiscount,
    cartAmount, setCartAmount,  // Add cartAmount state
 
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
