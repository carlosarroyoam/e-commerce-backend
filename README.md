# node-express-architecture-example

## Description

Repository contains source code for a e-commerce using nodejs.

## Prerequisites

To start developing you will need to install the following dependencies on your dev local
machine.

- NodeJs v18
- MySQL v8.x.x
- Docker

## Prerequisites

To start developing you will need to install the following dependencies in your local
dev machine.

- NodeJs v18
- MySQL v8.x.x
- Docker

## Developing

```
$ run nodejs-api.sql script into your MySQL management system
$ cp .env.example .env
$ set up your .env variables
$ npm install
$ npm run dev:start
$ navigate to `http://localhost:3000/api/v1/docs`
```

## Deploying

```
$ docker build -t ecommerce:${appVersion} .
$ docker run --name ecommerce --publish 3000:3000 --network dev --env APP_ENV=development --env DB_HOST=mysql-db-dev ecommerce:${appVersion}
```

## License

This project is licensed under the [Apache 2.0](LICENSE).
