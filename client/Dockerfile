# Stage 1: Build the React App
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json yarn.lock ./

# Install npm dependencies
RUN yarn install

# Copy the rest of the application to the working directory
COPY . .
ENV REACT_APP_URL=/api/v1
# Build the app
RUN yarn build

# Stage 2: Serve the React App using Nginx
FROM nginx:1.23.1-alpine

# Copy the build artifacts from the first stage
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./templates /etc/nginx/templates
ENV NGINX_PORT=3000
# Expose port 3000
EXPOSE 3000

# Configure Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]


