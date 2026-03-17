# E-Commerce Backend

A production-ready REST API built with Node.js and Express.js for e-commerce applications.

## Features

- User authentication (JWT-based with refresh tokens)
- Role-based access control (Admin, Customer)
- Password reset functionality
- Customer address management
- Product management with variants and attributes
- Category and property management
- Swagger API documentation

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: MySQL 8.0+
- **Authentication**: JWT with refresh tokens
- **Validation**: Joi
- **Documentation**: Swagger UI
- **Logging**: Winston
- **Testing**: Jest

## Prerequisites

- Node.js 20 or higher
- MySQL 8.0.35 or higher
- Docker (optional, for containerized deployment)

## Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/carlosarroyoam/e-commerce-backend.git
   cd e-commerce-backend
   ```

2. **Set up the database**

   ```bash
   # Run the SQL script in your MySQL management system
   mysql -u root -p < nodejs-api.sql
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT settings
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Start development server**

   ```bash
   npm run start:dev
   ```

6. **Access the API**
   - API Base URL: `http://localhost:3000/api/v1`
   - Swagger Docs: `http://localhost:3000/api/v1/docs`

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm start`         | Start production server                   |
| `npm run start:dev` | Start development server with auto-reload |
| `npm test`          | Run tests in watch mode                   |

## Project Structure

```
src/
├── api/              # Router configuration
├── core/
│   ├── config/       # Environment configuration
│   ├── docs/         # Swagger documentation
│   ├── errors/       # Custom error classes
│   ├── lib/          # Libraries (bcrypt, jwt, mysql, winston)
│   ├── middlewares/  # Express middlewares
│   └── utils/        # Utility functions
├── features/         # Feature modules
│   ├── auth/         # Authentication
│   ├── users/        # User management
│   ├── products/     # Product management
│   ├── categories/   # Category management
│   └── ...
└── test/            # Test files
```

## License

This project is licensed under the [Apache License 2.0](LICENSE).

---

For more details, see [AGENTS.md](./AGENTS.md) for developer guidelines.
