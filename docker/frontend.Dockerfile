# Multi-stage build: compile Next.js, then run minimal Node image
FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/package.json ./
RUN npm install

COPY frontend/ .

# Build-time API URL (override at runtime via env if needed)
ARG NEXT_PUBLIC_API_URL=http://localhost:5000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
