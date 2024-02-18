# Create image based on the official Node image from dockerhub
FROM node:18-bullseye-slim

# Set the environment variables
ENV APP_ENV=development
ENV DB_HOST=host.docker.internal

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# Install dependencies
# RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci

# Get all the code needed to run the app
COPY . .

# the .env file needed to run the app
COPY .env.example .env

# Expose the port the app runs in
EXPOSE 3000

# Run as a non-root user for security purpose
RUN <<EOF
   useradd -s /bin/bash -m ecommerceapp
   groupadd docker
   usermod -aG docker ecommerceapp
EOF

# Give non-root user permitions to app folders
RUN chown ecommerceapp /usr/src/app/
RUN chgrp ecommerceapp /usr/src/app/

USER ecommerceapp

# Serve the app
CMD ["npm", "start"]
