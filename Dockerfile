# Production image for self-hosting on arabi-prod via Coolify.
# Multi-stage: deps → build → slim standalone runtime (~250MB).
#
# NEXT_PUBLIC_* values are inlined into the client bundle at BUILD time —
# they arrive as build args from docker-compose.coolify.yml, interpolated
# from the Coolify env store. Server-side reads also get them via ENV.
#
# sharp (Next image optimizer) ships as a dependency of next@16 — nothing
# extra to install. Lockfile carries linux-x64 optional binaries (verified),
# so `npm ci` is deterministic on Linux.

FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# postinstall (partytown copylib) runs here harmlessly; real /public is
# copied from the repo in the build stage (public/~partytown is committed).
RUN npm ci --include=optional --no-audit --no-fund

FROM node:22-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_ADSENSE_CLIENT
ARG NEXT_PUBLIC_GOOGLE_VERIFICATION
ARG NEXT_PUBLIC_BING_VERIFICATION
ARG NEXT_PUBLIC_YANDEX_VERIFICATION
ARG NEXT_PUBLIC_FACEBOOK_VERIFICATION
ARG NEXT_PUBLIC_DEPLOY_CONTEXT=production
ARG INDEXNOW_KEY
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_ADSENSE_CLIENT=$NEXT_PUBLIC_ADSENSE_CLIENT \
    NEXT_PUBLIC_GOOGLE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_VERIFICATION \
    NEXT_PUBLIC_BING_VERIFICATION=$NEXT_PUBLIC_BING_VERIFICATION \
    NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION \
    NEXT_PUBLIC_FACEBOOK_VERIFICATION=$NEXT_PUBLIC_FACEBOOK_VERIFICATION \
    NEXT_PUBLIC_DEPLOY_CONTEXT=$NEXT_PUBLIC_DEPLOY_CONTEXT \
    INDEXNOW_KEY=$INDEXNOW_KEY
# prebuild (gen-lastmod) has no .git in the context → falls back to the
# current date, same behaviour as Netlify's shallow clone. Accepted.
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1
# --chown: the runtime user is `node`; Next must be able to write
# .next/cache (image optimizer output + "use cache" data cache).
COPY --chown=node:node --from=build /app/.next/standalone ./
COPY --chown=node:node --from=build /app/.next/static ./.next/static
COPY --chown=node:node --from=build /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
