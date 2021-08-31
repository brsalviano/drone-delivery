FROM node:14-slim
ENV NODE_ENV=development
WORKDIR /node
COPY ./app/package*.json ./
RUN yarn global add @nestjs/cli@8.1.1
RUN yarn install \
    && yarn cache clean --force
ENV PATH /node/node_modules/.bin:$PATH
WORKDIR /node/app
COPY ./app .
CMD ["nest", "start", "--watch"]
