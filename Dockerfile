# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
# Sử dụng BuildKit cache để tăng tốc install
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile

# ---------- Stage 2: Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Giới hạn memory cho build để phù hợp với VPS 2GB
ENV NODE_OPTIONS="--max-old-space-size=1536"
RUN yarn build

# ---------- Stage 3: Production Runtime ----------
FROM node:20-alpine AS production

RUN apk add --no-cache dumb-init
WORKDIR /app

ENV NODE_ENV=production
# Next.js standalone không cần chạy bằng root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy các file cần thiết từ builder (standalone mode)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["dumb-init", "--"]
# Chạy trực tiếp bằng node giúp khởi động nhanh và tiết kiệm RAM
CMD ["node", "server.js"]