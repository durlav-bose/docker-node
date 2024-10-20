# # Use the official Node.js image
# FROM node

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy only the package.json and package-lock.json
# COPY package*.json ./

# # Install production dependencies
# RUN npm install --only=production

# # Copy the entire source code (required for the build process)
# COPY . .

# # Build the application
# RUN npm run build

# # Remove source files after the build (optional optimization)
# RUN rm -rf src

# # Expose the app port
# EXPOSE 3000

# # Run the app in production mode from the dist folder
# CMD ["npm", "start"]



# Use a lightweight base image (Alpine)
FROM node:14-alpine as build

# Set working directory
WORKDIR /usr/src/app

# Copy only the package.json and lock file
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app (optional step for building front-end or transpiling)
RUN npm run build

# Remove source files after building
RUN rm -rf src

# Final production image stage
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only the built files from the previous build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/views ./views

# Expose the port for the app
EXPOSE 3000

# Run the app
CMD ["node", "dist/index.js"]
