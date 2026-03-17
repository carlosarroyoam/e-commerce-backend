# AGENTS.md - Developer Guide for E-Commerce Backend

This document provides guidelines for AI agents working on this codebase.

## Project Overview

- **Type**: Node.js/Express.js REST API
- **Database**: MySQL 8.0+
- **Language**: JavaScript (ES Modules)
- **Testing**: Jest
- **API Docs**: Swagger UI at `/api/v1/docs`

## Commands

### Development

```bash
npm install          # Install dependencies
npm run start:dev    # Start with nodemon (auto-reload)
npm start            # Start production server
```

### Testing

```bash
npm test             # Run all tests (watch mode)
```

**Running a single test:**

```bash
# Run specific test file
node --experimental-vm-modules node_modules/jest/bin/jest.js src/test/user.service.test.js

# Run specific test by name
node --experimental-vm-modules node_modules/jest/bin/jest.js --testNamePattern="should fetch user"

# Run without watch mode
node --experimental-vm-modules node_modules/jest/bin/jest.js --watchAll=false
```

### Linting & Formatting

```bash
# Run ESLint
npx eslint src/

# Run Prettier check
npx prettier --check src/

# Run Prettier fix
npx prettier --write src/
```

## Project Structure

```
src/
├── api/              # Router configuration
├── core/
│   ├── config/       # Environment configuration
│   ├── docs/         # Swagger documentation
│   ├── errors/      # Custom error classes
│   ├── lib/          # Libraries (bcrypt, jwt, mysql, winston)
│   ├── middlewares/ # Express middlewares
│   ├── routes/      # Default routes
│   └── utils/       # Utility functions
├── features/         # Feature modules (auth, users, products, etc.)
│   └── [feature]/
│       ├── *.controller.js
│       ├── *.service.js
│       ├── *.repository.js
│       ├── *.dao.js       # Data Access Object (SQL queries)
│       ├── *.mapper.js    # Entity mappers
│       ├── roles.js
│       └── schemas/       # Joi validation schemas
├── test/             # Test files
└── main.js           # Entry point
```

## Code Style Guidelines

### Imports & Path Aliases

Use the path aliases defined in `package.json`:

```javascript
// Core modules
import config from '#core/config/index.js';
import logger from '#core/lib/winston/logger.js';
import sharedErrors from '#core/errors/index.js';

// Feature modules
import authService from '#features/auth/auth.service.js';
import userRepository from '#features/users/user.repository.js';
```

### Formatting (Prettier)

- **Single quotes**: `'string'`
- **Trailing commas**: ES5 style
- **Print width**: 100 characters
- Config in `.prettierrc`

### Naming Conventions

- **Files**: kebab-case (`user.service.js`, `auth.controller.js`)
- **Classes**: PascalCase (`UserService`, `AuthController`)
- **Variables/functions**: camelCase (`findById`, `user_id`)
- **Database fields**: snake_case (`user_id`, `created_at`, `first_name`)
- **Constants**: SCREAMING_SNAKE_CASE

### Architecture Pattern

Follow the Controller → Service → Repository → DAO pattern:

1. **Controller**: Handles HTTP requests/responses, calls service
2. **Service**: Business logic, transaction management
3. **Repository**: Data access abstraction, maps entities
4. **DAO**: Raw SQL queries

### Error Handling

Use custom error classes from `#core/errors/`:

```javascript
import sharedErrors from '#core/errors/index.js';

throw new sharedErrors.BadRequestError('Invalid input');
throw new sharedErrors.UnauthorizedError({ message: '...', email: undefined });
throw new sharedErrors.UserNotFoundError({ email: undefined });
throw new sharedErrors.InternalServerError('Error while...');
```

Controllers pass errors to `next(error)`:

```javascript
async login(request, response, next) {
  try {
    // ...
  } catch (error) {
    next(error);
  }
}
```

Services log and transform errors:

```javascript
} catch (err) {
  if (!err.status) {
    logger.error({ message: err.message });
    throw new sharedErrors.InternalServerError('Error while retrieving users');
  }
  throw err;
}
```

### Database Connections

Always release connections in service layer:

```javascript
let connection;
try {
  connection = await dbConnectionPool.getConnection();
  // use connection
} catch (err) {
  if (connection) connection.release();
  // handle error
}
if (connection) connection.release();
```

### Testing

- Test files in `src/test/` directory
- Use `describe` blocks for grouping
- Use `test` or `it` for individual tests
- Use path aliases: `import userService from '#features/users/user.service.js'`

### Validation

- Use Joi for request validation
- Schemas stored in `features/*/schemas/` directories

### Logging

Use Winston logger:

```javascript
import logger from '#core/lib/winston/logger.js';

logger.error({ message: err.message, ...context });
logger.info({ message: 'Operation successful' });
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- Database credentials
- JWT settings
- App environment (dev/prod)

## API Documentation

Access Swagger UI at `http://localhost:3000/api/v1/docs` when running the server.
