# Use official Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copy rest of the project
COPY . .

# Expose default Vite port
EXPOSE 5174


ENV PORT=5174

# Start Vite dev server
CMD ["npm", "run", "dev"]
