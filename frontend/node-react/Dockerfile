FROM node:8

# create app directory
WORKDIR /app

RUN yarn create react-app blog-app

WORKDIR /app/blog-app

EXPOSE 3000

ENTRYPOINT ["yarn"]
CMD ["start"]

# install dependencies
COPY package.json /app/blog-app/package.json
ARG PRODUCTION=false

RUN yarn install --production=${PRODUCTION}

# bundle src
COPY public/ /app/blog-app/public
COPY src/ /app/blog-app/src
