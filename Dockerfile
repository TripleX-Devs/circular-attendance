FROM node:20-alpine

RUN npm install -g pnpm

RUN npm install -g typescript

WORKDIR /user/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY ./prisma ./prisma
COPY . .

RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "run", "dev"]