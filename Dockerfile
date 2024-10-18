# Use the official Node.js 18 Alpine image
FROM node:22.8.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Install necessary dependencies for building the app
RUN apk add --no-cache libc6-compat

# Copy package.json and lock file (yarn.lock if you're using yarn)
COPY package.json package-lock.json ./
COPY next.config.mjs ./
COPY tsconfig.json ./
COPY postcss.config.mjs ./
COPY tailwind.config.ts ./

ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY src ./src

# Build the Next.js app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js app using the Next.js start command or serve the static build
CMD ["npm", "run", "start"]
