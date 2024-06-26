# Create image based on the official Node image from dockerhub
FROM node:18-bullseye-slim

# Add a healtcheck
HEALTHCHECK CMD curl --fail http://localhost:${APP_PORT} || exit 1

# Create app directory
WORKDIR /usr/app

# Create a non-root user for security purpose
RUN <<EOF
   useradd -s /bin/bash -m app
   groupadd docker
   usermod -aG docker app
EOF

# Give non-root user permitions to app folders
RUN chown app /usr/app
RUN chgrp app /usr/app

# Set non-root user
USER app

# Expose the port the app runs in
EXPOSE ${APP_PORT}

# Copy dependency definitions
COPY package.json .
COPY package-lock.json .

# Install app dependencies
RUN npm ci --omit=dev

# Copy all the code needed to run the app
COPY . .

# Set the environment variables
ENV APP_ENV=${APP_ENV}
ENV APP_NAME=${APP_NAME}
ENV APP_HOST=${APP_HOST}
ENV APP_PORT=${APP_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_CONNECTION_LIMIT=${DB_CONNECTION_LIMIT}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
ENV JWT_REFRESH_SECRET_KEY=${JWT_REFRESH_SECRET_KEY}
ENV JWT_REFRESH_EXPIRES_IN=${JWT_REFRESH_EXPIRES_IN}
ENV JWT_PASSWORD_RECOVERY_SECRET_KEY=${JWT_PASSWORD_RECOVERY_SECRET_KEY}
ENV JWT_PASSWORD_RECOVERY_EXPIRES_IN=${JWT_PASSWORD_RECOVERY_EXPIRES_IN}
ENV SALT_ROUNDS=${SALT_ROUNDS}

# Serve the app
CMD npm run start
