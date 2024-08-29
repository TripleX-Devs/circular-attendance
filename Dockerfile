FROM node:20-alpine


WORKDIR /user/src/app

COPY package* ./

RUN npm install

COPY ./prisma .

RUN npm run db:generate

COPY . .

EXPOSE 8080

CMD [ "npm" , "run" , "dev" ]