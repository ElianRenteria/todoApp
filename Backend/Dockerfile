# Use a base image for Node.js that is compatible with ARM processors
FROM arm32v7/node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Command to run the application
CMD ["npm", "start"]
