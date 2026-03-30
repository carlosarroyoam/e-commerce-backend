# E-Commerce Backend

REST API for an e-commerce platform built with Node.js, Express, and MySQL. The project follows a feature-based structure and exposes versioned endpoints under `/api/v1`, with Swagger UI available for exploration and manual testing.

## What It Includes

- JWT authentication with access, refresh, and password recovery tokens
- Role-aware modules for users, admins, and customers
- Customer address management
- Product, product variant, category, attribute, and property management
- Request validation, centralized error handling, and structured logging
- Jest test setup for service and module testing

## Stack

- Node.js 20
- Express 4
- MySQL 8
- Joi
- JWT
- Winston
- Jest
- Docker and Docker Compose

## Requirements

- Node.js 20+
- npm
- MySQL 8+
- Docker Desktop or Docker Engine (optional)

## Quick Start

### Option 1: Run Locally

1. Clone the repository.

```bash
git clone https://github.com/carlosarroyoam/e-commerce-backend.git
cd e-commerce-backend
```

2. Install dependencies.

```bash
npm install
```

3. Create your environment file.

```bash
cp .env.example .env
```

4. Import the schema and seed data.

```bash
mysql -u root -p < database/schema.sql
```

5. Update `.env` with your local database credentials and JWT secrets.

6. Start the API in development mode.

```bash
npm run start:dev
```

### Option 2: Run With Docker Compose

1. Create your environment file.

```bash
cp .env.example .env
```

2. Start the database and API.

```bash
docker compose up --build
```

The SQL dump in `database/schema.sql` is mounted into the MySQL container and imported automatically on first startup.

## Default Local URLs

- API base URL: `http://localhost:3000/api/v1`

## Available Scripts

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm start`         | Start the server with Node.js                     |
| `npm run start:dev` | Start the server with `nodemon`                   |
| `npm test`          | Run Jest in watch mode with open-handle detection |

To run Jest once instead of watch mode:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --watchAll=false
```

To run a single test file:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/test/user.service.test.js
```

## Environment Variables

Use `.env.example` as the source of truth. The main variables are:

```env
APP_ENV=dev
APP_HOST=http://localhost
APP_PORT=3000
DB_USER=yourdbuser
DB_PASSWORD=yourdbpassword
DB_NAME=ecommerce
DB_HOST=localhost
DB_PORT=3306
DB_CONNECTION_LIMIT=20
JWT_SECRET_KEY=secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET_KEY=refreshsecret
JWT_REFRESH_EXPIRES_IN=1d
JWT_PASSWORD_RECOVERY_SECRET_KEY=recoverysecret
JWT_PASSWORD_RECOVERY_EXPIRES_IN=15m
SALT_ROUNDS=10
```

## Project Structure

```text
src/
|-- api/                 # Express server and router bootstrap
|-- core/
|   |-- config/          # Environment and app configuration
|   |-- errors/          # Shared error classes
|   |-- lib/             # MySQL, JWT, bcrypt, logger
|   |-- middlewares/     # Error and request middlewares
|   `-- routes/          # Root and fallback routes
|-- features/
|   |-- admins/
|   |-- attributes/
|   |-- auth/
|   |-- categories/
|   |-- customerAddresses/
|   |-- customers/
|   |-- products/
|   |-- productVariants/
|   |-- properties/
|   `-- users/
|-- test/                # Jest tests
`-- main.js              # Application entry point
```

## Architecture Notes

The codebase follows a layered flow inside each feature:

`Controller -> Service -> Repository -> DAO`

This keeps HTTP concerns, business logic, data mapping, and SQL responsibilities separated.

## API Modules

The main route groups mounted under `/api/v1` are:

- `/auth`
- `/users`
- `/admins`
- `/customers`
- `/products`
- `/attributes`
- `/properties`
- `/categories`

Some customer address and product variant routes are also mounted from their feature modules at the API root level.

## Development Notes

- Path aliases are configured in `package.json` for `#app/*`, `#core/*`, and `#features/*`.
- Logs are written through Winston.
- CORS is currently configured for `http://localhost:3001` and `http://localhost:4200`.
- Swagger is served directly by the Express app.

## License

Licensed under the [Apache License 2.0](LICENSE).

## Contributor Reference

Developer-oriented conventions for this repository live in `AGENTS.md`.
