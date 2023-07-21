FROM oven/bun:0.7.0
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY src src
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun", "start"]