FROM node:dubnium

WORKDIR /usr/src/

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV PORT 4000
ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "index.js"]
