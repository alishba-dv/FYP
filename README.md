
# FYP
A  web-bassed platform that blends e-commerce, pet adoption, and personalized pet care solutions into one seamless experience. Users can adopt pets directly from owners, purchase tailored health and wellness products, and receive AI-powered recommendations for their pets’ needs.

The system also includes an Admin Panel with a UI Dashboard for managing products, users, orders, and adoption requests.

📌 Features
🐶 Pet Adoption – Browse, explore, and adopt pets from verified owners.

🛒 E-Commerce Store – Buy high-quality pet care products, food, and accessories.

🤖 AI-Powered Chatbot – Botpress integration for personalized product suggestions based on pet health conditions.

📦 Monthly Care Kits – Subscribe to curated pet care kits for convenience.

📊 Admin Panel & Dashboard – Manage users, products, orders, and adoption requests from a modern UI.

💬 Interactive UI – Modern, responsive design for all devices.


Project is also containerized alongwith docker for more comaptibility an every device and to resolve compatibility issues and also images can be pulled directly from docker: 
```bash

## to pull admin module

docker pull alishba111/furliva:admin

## to pull frontend and backend of user module
docker pull alishba111/furliva:frontend
docker pull alishba111/furliva:backend


```


🛠 Tech Stack
Technology	Purpose
React.js	Frontend presentation layer
Node.js / Express.js	Backend API & business logic
MongoDB	Database for pets, users, and products
Botpress	AI chatbot for recommendations
Tailwind CSS	Responsive UI styling

🚀 Project Goals
Streamline the pet adoption process.

Offer tailored pet care solutions with accurate recommendations.

Ensure high-quality product availability for all pet owners.

Provide full admin control through an intuitive dashboard.

Create a smooth and engaging user experience.

📷 Screenshots
(Add images of your UI when available)

📦 Installation & Setup
Clone the repository

```bash

git clone https://github.com/your-username/pet-care-adoption.git
cd pet-care-adoption
##Install dependencies
##For backend:


cd backend
npm install
###For frontend:


cd frontend
npm install
###Set up environment variables
###Create .env files in backend and frontend with necessary keys (MongoDB URI, Botpress API keys, etc.).

Run the project
Backend:


npm start
###Frontend:


npm run dev

###Open in browser:

http://localhost:5173

```


