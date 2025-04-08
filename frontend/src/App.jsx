import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Placeorder from "./pages/Placeorder";
import Product from "./pages/Product";
import { Navbar } from "./components/Navbar";
import Cart from "./pages/Cart";
import { Footer } from "./components/Footer";
import { Search } from "./components/Search";
import AccessoriesCollection from "./pages/AccessoriesCollection";
import MedicineCollection from "./pages/MedicineCollection";
import AccessProducts from "./pages/AccessProducts";
import MedicineProduct from "./pages/MedicineProduct";
import { Myprofile } from "./pages/Myprofile";
import Logout from "./components/Logout";
import ForgotPage1 from "./pages/ForgotPage1";
import ForgotPassword2 from "./pages/ForgotPassword2";
import ForgotPassword3 from "./pages/ForgotPassword3";
import ForgotPassword4 from "./pages/ForgotPassword4";
import { ToastContainer } from "react-toastify";
import Adoption from "./pages/Adoption";
import SubscriptionPage1 from "./components/SubscriptionPage1";
import SubscriptionPage2 from "./components/SubscriptionPage2";
import SubscriptionPage3 from "./components/SubscriptionPage3";
import SubscriptionPage4 from "./components/SubscriptionPage4";

import ManageSubscription from "./components/ManageSubscription";
import PaymentRejectionPage from "./components/PaymentRejectionPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import PetList from "./pages/PetsAdoption";
import ProtectedRoute from "./ProtectedRoute";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import SubscriptionProductDetailPage from "./components/SubscriptionProductDetailPage";
import  SalePoster  from './components/salePoster';

function App() {
  const { isLoggedIn } = useContext(ShopContext);

  return (
    <div >

      <Navbar />      <SalePoster  />

      <Search></Search>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />

        <Route path="/Adoption" element={<Adoption />} />

        <Route path="/collection1" element={<AccessoriesCollection></AccessoriesCollection>} />
        <Route path="/collection2" element={<MedicineCollection></MedicineCollection>} />
        <Route path="/petlist" element={<PetList></PetList>} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />

        <Route element={<ProtectedRoute isLoggedIn={!isLoggedIn} to="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPage1></ForgotPage1>} />
          <Route path="/forgot1" element={<ForgotPassword2></ForgotPassword2>} />
          <Route path="/forgot2" element={<ForgotPassword3></ForgotPassword3>} />
          <Route path="/forgot3" element={<ForgotPassword4></ForgotPassword4>} />
        </Route>

        <Route path="/logout" element={<Logout></Logout>} />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/order" element={<Order />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/manage" element={<ManageSubscription></ManageSubscription>} />
          <Route path="/manage/productDetail/:id" element={<SubscriptionProductDetailPage />} />
          <Route path="/sub1" element={<SubscriptionPage1></SubscriptionPage1>} />
          <Route path="/sub2" element={<SubscriptionPage2></SubscriptionPage2>} />
          <Route path="/sub3" element={<SubscriptionPage3></SubscriptionPage3>} />
          <Route path="/sub4/:id" element={<SubscriptionPage4></SubscriptionPage4>} />
         
        </Route>

        <Route path="/placeorder" element={<Placeorder />} />
        <Route path="/accessory/:productid" element={<AccessProducts />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/med/:productid" element={<MedicineProduct></MedicineProduct>} />

        <Route path="/success" element={<PaymentSuccessPage></PaymentSuccessPage>} />
        <Route path="/cancel" element={<PaymentRejectionPage></PaymentRejectionPage>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
