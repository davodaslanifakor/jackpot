# Stage 1: Build and test the Vue.js application
FROM node:16.14.2 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./
COPY yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the project files
COPY . .

# Run the test cases
RUN yarn test:unit

# Build the application
RUN yarn build

# Stage 2: Serve the built application using NGINX
FROM nginx:1.21.3-alpine AS production

# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the desired port (e.g., 80)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
