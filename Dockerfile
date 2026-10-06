# =========================
# Runtime stage
# =========================
FROM node:24-alpine

WORKDIR /home/node/app

RUN chown node /home/node/app && \
    chgrp node /home/node/app

USER node

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["npm", "run", "start"]
