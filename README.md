# Item Management API

A RESTful API for managing items built with Express.js, TypeScript, and Prisma.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Techonolgy used](#technology-used)
- [Project Structure](#project-structure)
- [Author](#author)

## Features

- CRUD operations for items
- Type-safe endpoints
- Input validation
- Structured error handling
- Prisma ORM integration

## API Endpoints

### Items

| Method | Endpoint              | Description             | Request Body                                              |
| ------ | --------------------- | ----------------------- | --------------------------------------------------------- |
| GET    | `/api/barang/data`    | Get all items           | -                                                         |
| POST   | `/api/barang/create`  | Create a new item       | `{ name: string, description: string, price: number }`    |
| PUT    | `/api/barang/:itemId` | Update an existing item | `{ name?: string, description?: string, price?: number }` |
| DELETE | `/api/barang/:itemId` | Delete an item          | -                                                         |

## Request/Response Examples

### Get All Items

**Request:**

```http
GET /api/items/data
```

**Success Reponse:**

```
{
  "status": "success",
  "code": "retrieve_all_items",
  "message": "Successful retrieve all items",
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "name": "Sample Item",
      "description": "Item description",
      "price": 9.99,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Create Item

**Request:**

```
POST /api/items/create
Content-Type: application/json

{
  "name": "New Item",
  "description": "New description",
  "price": 19.99
}
```

**Success Response (201)**

```
{
  "status": "success",
  "code": "successful_create_item",
  "message": "Successful create new item",
  "statusCode": 201,
  "data": {
    "id": 2,
    "name": "New Item",
    "description": "New description",
    "price": 19.99,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Response**

```
{
  "error": {
    "type": "BusinessLogic",
    "message": "Item not found",
    "code": "item_not_found",
    "statusCode": 404,
    "details": {
      "itemId": 999
    }
  }
}
```

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database
- Prisma CLI

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/anrisys/test-case-2_API-backend.git
    cd my-backend-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add the necessary environment variables (e.g., database connection string, port):

      ```
      PORT=3000
      # Example for a database (replace with your actual database configuration)
      DATABASE_URL="your_database_connection_string"
      ```

    - Make sure database is already created

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

## Running the application

### Development

To run the server:

```bash
npm run dev
```

## Technology used

- Express.js
- TypeScript
- Prisma ORM
- Zod (validation)
- Class-based architecture
- Dependency injection pattern

## Project Structure

```
src/

├── application/    # Express app configuration
├── controllers/    # Route controllers
├── error/          # Custom Error and Response Error
├── lib/            # Library configuration
├── middleware/     # Custom middleware
├── repositories/   # Database repositories
├── routes/         # Route definitions
├── services/       # Business logic
├── types/          # Type definitions
├── utils/          # Utility functions
├── validations/    # Validation class for CRUD
prisma/
├── schema.prisma   # Database schema
```

## Author

The author of this app is Anris Y. Simorangkir
