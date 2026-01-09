FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.7.0 --activate

FROM base AS builder
WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./
COPY front/package.json ./front/package.json
COPY api/package.json ./api/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY front ./front
COPY api ./api

# Build front
RUN pnpm turbo build --filter=front

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built files
COPY --from=builder /app/front/.next/standalone ./
COPY --from=builder /app/front/.next/static ./front/.next/static
COPY --from=builder /app/front/public ./front/public

EXPOSE 3000

CMD ["node", "front/server.js"]
