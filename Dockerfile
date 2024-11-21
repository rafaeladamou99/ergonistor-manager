# Step 1: Use the official Node.js image as a base image
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) first to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application source code
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Set up a production environment to serve the built app
FROM nginx:alpine

# Step 8: Copy the build folder from the build image to the nginx image
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to access the app
EXPOSE 3001

# Step 10: Start the Nginx server to serve the React app
CMD ["nginx", "-g", "daemon off;"]
