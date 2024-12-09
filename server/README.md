# Todo app challenge (backend)

- more details in main [README.md](../README.md)

## Pre-requisites

- node v 18+
- MySQL installed, up and running ([download link](https://dev.mysql.com/downloads/mysql/))
- No services running on localhost port 8080

## Run backend

```
# Install dependencies
npm install

# Run app
npm run dev
```

## Run tests

```
npm run test
```

## Technical Decisions

### Architecture & Structure

- **TypeScript**: Chosen for type safety, better IDE support, and improved maintainability
- **Express.js**: Lightweight and flexible Node.js framework, perfect for REST APIs
- **MySQL**: Relational database chosen for data consistency and relationship management

### Code Organization

- **Repository Pattern**: Separates database logic from business logic
- **Types Directory**: Centralized type definitions for better TypeScript integration
- **Utils**: Shared utilities and helper functions

### Testing Strategy

- **Jest**: Main testing framework for unit tests
- **Mock Database**: Tests use mocked database connections for isolation and speed
- **Repository Tests**: Focus on data access layer testing with mocked database calls

### Development Environment

- **Docker**: Containerized development environment for consistency
- **Docker Compose**: Manages multi-container setup (API, MySQL, Tests)
- **Nodemon**: Hot reloading for better development experience
- **ESLint & Prettier**: Code style consistency and formatting

### Security

- **UUID Session Tokens**: Using UUID v4 for generating unique, random session tokens
- **Parameterized Queries**: Using mysql2's built-in query parameterization to prevent SQL injection
- **Environment Variables**: Sensitive data managed via .env files
- **CORS**: Configured for secure cross-origin requests

### Database

- **Connection Pool**: Efficient database connection management
- **Prepared Statements**: Prevention of SQL injection attacks
- **Schema Migrations**: SQL files for version control of database schema

### API Design

- **RESTful Principles**: Clear and consistent API endpoints
- **Error Handling**: Standardized error responses
- **Input Validation**: Request validation before processing

### CI/CD

- **Containerized Testing**: Ability to run tests in isolated Docker environment
- **Separate Test Database**: Dedicated database for testing environment

## Technology

- Programming languaje: Typescript
- APP Frameworks: React Native + Expo
