const http = require("http");
const app = require("./services/express");
const connectDB = require("./services/db"); // Import DB connection

async function main() {
  const server = http.createServer(app);
  await connectDB();

  const PORT = process.env.PORT || 8080;
  server.listen(PORT, '0.0.0.0', () => console.log(`Server is running on ${PORT}`));
}

main();
