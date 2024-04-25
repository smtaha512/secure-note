FROM node:20 AS builder
ARG NODE_ENV="production"
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Smaller image for production
FROM node:20-alpine

ARG NODE_ENV="production"

WORKDIR /usr/src/app

COPY --from=builder /usr/src/package*.json ./

COPY --from=builder /usr/src/node_modules ./node_modules

COPY --from=builder /usr/src/dist ./dist

COPY --from=builder /usr/src/tsconfig* ./

CMD ["npm", "run", "start:prod"]