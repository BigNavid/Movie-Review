# Use the official Node.js 22 image as a base
FROM node:22

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files into the working directory
COPY package*.json./

# Install the dependencies
RUN npm install

# Copy the application code into the working directory
COPY..

# Expose the port the application will run on
EXPOSE 5000

# Run the application when the container is started
CMD ["node", "app.js"]