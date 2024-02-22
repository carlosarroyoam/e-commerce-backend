# Create image based on the official Node image from dockerhub
FROM node:18-bullseye-slim

# Set the environment variables
ENV APP_ENV=development
ENV APP_NAME=ecommerce
ENV APP_URL=http://localhost
ENV APP_PORT=3000

ENV DB_USER=root
ENV DB_PASSWORD=toor
ENV DB_NAME=ecommerce
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_CONNECTION_LIMIT=20

ENV JWT_SECRET_KEY=secret
ENV JWT_EXPIRES_IN=15m
ENV JWT_REFRESH_SECRET_KEY=refreshsecret
ENV JWT_REFRESH_EXPIRES_IN=1d
ENV JWT_PASSWORD_RECOVERY_SECRET_KEY=recoverysecret
ENV JWT_PASSWORD_RECOVERY_EXPIRES_IN=15m

ENV SALT_ROUNDS=10

# Expose the port the app runs in
EXPOSE 3000

# Create app directory
WORKDIR /app/src

# Copy dependency definitions
COPY package.json .
COPY package-lock.json .

# Install app dependencies
RUN npm ci

# Create a non-root user for security purpose
RUN <<EOF
   useradd -s /bin/bash -m ecommerceapp
   groupadd docker
   usermod -aG docker ecommerceapp
EOF

# Give non-root user permitions to app folders
RUN chown ecommerceapp /app/src
RUN chgrp ecommerceapp /app/src

# Set non-root user
USER ecommerceapp

# Copy all the code needed to run the app
COPY . .

# Serve the app
CMD ["npm", "start"]
