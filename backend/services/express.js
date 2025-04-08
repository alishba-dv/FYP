require("dotenv/config");
const express = require("express");
const cookieParser = require('cookie-parser');

const cors = require("cors");
const app = express();
const login = require("../routes/authRoutes");
const myProfile = require("../routes/profileRoutes");
const editProfile = require("../routes/editProfile");
const resetPassword = require("../routes/reset");
const forgot = require("../routes/forgot");
const orderRoutes = require("../routes/order"); // Updated
const orderFetch = require("../routes/orderFetch");
const addproduct = require("../routes/AddProduct");
const OrderList = require("../routes/OrderFetchForAdmin");
const collection = require("../routes/collection");
const list = require("../routes/ProductsList");
const DeleteProduct = require("../routes/DeleteProductAdmin");
const editProduct = require("../routes/EditProductAdmin");
const FetchAccessories = require("../routes/FetchAccessories");
const FetchMedicines = require("../routes/FetchMedicines");
const stripewebhook = require("../routes/stripeWebHook");
const checkoutroute = require("../routes/checkout");
const userfetch = require("../routes/users");
const AdoptionForm = require("../routes/AdoptionForm");
const getadoptionforms = require("../routes/getadoptionforms");
const approveadoptionform = require("../routes/approvePetRequest");
const subscription = require("../routes/Subscription");
const { runSubscriptionExpiryJob } = require('../routes/cronjob'); // Importing the cron job
const { backupDatabase } = require('../backup'); // Importing the backup function
const sales = require('../routes/sales');
app.use("/", stripewebhook);


  
  app.use(cookieParser()); 
  app.use(
    cors({
      origin: [
          "http://localhost:5173",
          "http://localhost:5174",
          "http://172.21.0.2:5173",
          "http://172.19.0.2:5174/,",
          
          "http://0.0.0.0:5173",
          "http://0.0.0.0:5174"
        ] ,     credentials: true, // Allow cookies
    })
  );

  app.options('*', cors()); // Optional preflight handling

  
app.use(express.json());
app.use(express.static("public"));

//with jwt auth requ
app.use("/api/auth", myProfile);
app.use("/api/auth", editProfile);
app.use("/api/admin/auth", addproduct);
app.use("/api/admin/auth", list);
app.use("/api/admin/auth", OrderList);
app.use("/api/admin/auth", DeleteProduct);
app.use("/api/admin/auth", editProduct);
app.use("/api/auth", orderFetch);
app.use("/api/admin/auth", userfetch);
app.use("/api/admin/auth", getadoptionforms);
app.use("/api/admin/auth", approveadoptionform);

//without jwt auth required
app.use("/api/", login);
app.use("/api", collection);
app.use("/api", FetchAccessories);
app.use("/api", FetchMedicines);
app.use("/api", forgot);
app.use("/api", resetPassword);
app.use("/api", orderRoutes);
app.use("/api/", checkoutroute);
app.use("/api/", AdoptionForm);
app.use('/api/admin/sales', sales);


app.use("/api/auth/subscription", subscription);




module.exports = app;
