FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.7.0 --activate

FROM base AS builder
WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./
COPY api/package.json ./api/package.json
COPY front/package.json ./front/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY api ./api

# Build api
RUN pnpm turbo build --filter=api

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built files and dependencies
COPY --from=builder /app/api/package.json ./
COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/prisma ./prisma
COPY --from=builder /app/api/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]
