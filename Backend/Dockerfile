FROM arm64v8/node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy the rest of the application code to the container
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Start the application
CMD ["npm", "start"]
