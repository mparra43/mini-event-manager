# Build stage
FROM node:20-bullseye-slim AS builder
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./
# Ensure Prisma schema is present for postinstall hooks
COPY prisma ./prisma
RUN npm install

# Copy rest of the sources
COPY . .

# Generate Prisma client and build
RUN npm run prisma:generate
RUN npm run build

# Runner stage
FROM node:20-bullseye-slim AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Copy entrypoint that applies Prisma schema on startup
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/main"]
