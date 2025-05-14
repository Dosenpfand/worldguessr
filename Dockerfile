# Use Node.js v22 (Alpine for smaller size, or use node:22 for a Debian-based one)
FROM node:22

RUN npm install -g concurrently
RUN npm install -g pnpm
RUN npm install -g cross-env

# Set environment variables
# NODE_ENV=production enables optimizations in Node.js and Next.js
ENV NODE_ENV=production
# Suppress general Node.js warnings (ExperimentalWarning is handled per-script)
ENV NODE_OPTIONS='--no-warnings'
# Set default UWS max header size (can be overridden at runtime if needed)
ENV UWS_HTTP_MAX_HEADERS_SIZE=16384
# Default port for Next.js (can be overridden at runtime)
ENV PORT=3000

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
# This leverages Docker's layer caching. If these files don't change,
# Docker won't re-run npm install unless the base image changes.
COPY package*.json ./

# Install all dependencies (including devDependencies for build and npx)
# For a truly minimal image size, you'd use a multi-stage build to remove devDependencies later,
# but this is a single-stage "minimalist Dockerfile" as requested.
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
# This needs to happen after all code is copied and dependencies are installed.
RUN pnpm run build

# Expose the port Next.js will run on (and any other ports your services use if they need to be accessed externally)
EXPOSE ${PORT}
# If ws/ws.js runs on a different port, e.g., 8080, uncomment and expose:
# EXPOSE 8080

# Command to run your application
# This will execute: node welcome.js && npx concurrently ...
CMD ["pnpm", "run", "prod:run"]
