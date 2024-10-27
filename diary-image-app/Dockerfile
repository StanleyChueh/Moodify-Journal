FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app files
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment variable to use legacy OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# Start the app
CMD ["npm", "start"]

