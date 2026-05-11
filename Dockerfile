# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
# Install only production dependencies
RUN yarn install --frozen-lockfile --production && yarn cache clean

# ---------- Stage 2: Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
# Install ALL dependencies (including dev)
RUN yarn install --frozen-lockfile
# Copy source code
COPY . .
# Build frontend
RUN yarn build


# ---------- Stage 3: Production Runtime ----------
FROM node:20-alpine AS production

# Add dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

WORKDIR /app

ENV NODE_ENV=production

# Copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy build output and necessary configs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

# Use the next binary directly to avoid extra shell/yarn processes
CMD ["node_modules/.bin/next", "start"]