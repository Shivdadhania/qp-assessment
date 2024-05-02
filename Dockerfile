FROM node:20.6.1-alpine

WORKDIR /app

# install apk packages
RUN apk add --no-cache nodejs npm yarn

ENV INIT_CWD=/app

# install npm packges
ADD package.json package-lock.json ./

RUN npm install

# add code and compile
ADD tsconfig.json tsconfig.build.json nest-cli.json ./
ADD src ./src
# RUN mkdir images

# RUN npm run build
RUN npx nest build

# copy .env.development & create .env in docker
ADD .env ./

# main code
# ENV PORT 5000
EXPOSE 5000
# CMD ["npm", "run", "start:prod"]
CMD npm run start
