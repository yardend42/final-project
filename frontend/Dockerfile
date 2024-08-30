# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Create Application directory (destination)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available
COPY package.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Install serve as a global service to serve the React build
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Use serve to serve the static files
CMD ["serve", "-s", "build"]

# Optional Docker build and run commands:
# docker build . -t my-react-app
# docker run -p 3000:3000 my-react-app
