# Use a non-Alpine base for better compatibility with native modules like Rollup
FROM node:22-slim

# Set the working directory
WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies inside Docker
RUN npm install

# Copy the rest of the app's source code
COPY . .

# 🔁 Optional: Clean Vite cache and dist to avoid stale builds
RUN rm -rf node_modules/.vite dist

# Expose Vite's default port
EXPOSE 5173

# Start the development server with host binding
CMD ["npm", "run", "dev", "--", "--host"]
