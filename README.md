# Develop

To start developing you will need to install the following tools on your dev local machine:

- Node.js 20
- MySQL 8.0.35 or higher
- Docker

```
$ run nodejs-api.sql script into your MySQL management system
$ cp .env.example .env
$ set up your .env variables
$ npm install
$ npm run dev:start
$ navigate to `http://localhost:3000/api/v1/docs`
```

# Run

```
$ docker build -t ecommerce .
$ docker container run -dp 3000:3000 --name ecommerce-backend ecommerce
```

or

```
$ docker compose build
$ docker compose up --detach
```

# License

This project is licensed under the [Apache 2.0](LICENSE).
