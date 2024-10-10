# Create image based on the official Node image from dockerhub
FROM node:20-alpine

# Add a healtcheck
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

# Expose the port the app runs in
EXPOSE 3000

# Create app directory
WORKDIR /home/node/app

# Give non-root user permitions to app folders
RUN chown node /home/node/app && \
    chgrp node /home/node/app

# Set non-root user
USER node

# Copy dependency definitions
COPY package*.json .

# Install app dependencies
RUN npm ci --omit=dev

# Copy all the code needed to run the app
COPY . .

# Serve the app
CMD ["npm", "run", "start"]
