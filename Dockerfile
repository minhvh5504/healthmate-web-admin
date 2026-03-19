# ---------- Stage 1: Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# copy package files trước để cache layer
COPY package.json yarn.lock ./

# install all dependencies (including dev)
RUN yarn install --frozen-lockfile

# copy source code
COPY . .

# build frontend
RUN yarn build


# ---------- Stage 2: Production dependencies ----------
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock ./

# chỉ install production deps
RUN yarn install --frozen-lockfile --production=true \
    && yarn cache clean


# ---------- Stage 3: Runtime ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# copy production node_modules
COPY --from=dependencies /app/node_modules ./node_modules

# copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# copy package.json
COPY package.json ./

EXPOSE 3000

CMD ["yarn","start"]