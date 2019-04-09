FROM node:8

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install @angular/cli@6.2.5

RUN npm install --silent

COPY . /usr/src/app/

EXPOSE 8081

CMD ["npm", "start"]