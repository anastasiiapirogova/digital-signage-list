FROM node:slim

RUN apt-get update && apt-get install -y \
    fontconfig \
    libvips-dev \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4321

CMD ["npx", "astro", "dev", "--host", "0.0.0.0"]