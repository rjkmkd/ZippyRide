# Backend API Documentation

## User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It requires the user to provide a username, full name, email, and password. The password will be hashed before storing it in the database.

### Request Body:
The request body should be a JSON object containing the following fields:

- `userName` (string): The username of the user. It must be unique.
- `fullName` (object): An object containing the user's first and last name.
  - `firstName` (string): The first name of the user. It must be at least 3 characters long.
  - `lastName` (string): The last name of the user.
- `email` (string): The email address of the user. It must be a valid email format.
- `password` (string): The password of the user. It must be at least 6 characters long.

### Example Request:
```json
{
  "userName": "john_doe",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code: 201 Created**
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "userName": "john_doe",
      "email": "john.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "timestamp_here",
      "updatedAt": "timestamp_here"
    }
  }
  ```

#### Validation Errors:
- **Status Code: 400 Bad Request**
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullName.firstName",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Username Already Exists:
- **Status Code: 409 Conflict**
- **Response Body:**
  ```json
  {
    "error": "Username already exists. Please choose a different one."
  }
  ```

#### Server Error:
- **Status Code: 500 Internal Server Error**
- **Response Body:**
  ```json
  {
    "error": "Server Error"
  }
  ```

  ## User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It requires the user to provide their email and password. If the credentials are correct, a JWT token is returned.

### Request Body:
The request body should be a JSON object containing the following fields:

- `email` (string): The email address of the user. It must be a valid email format.
- `password` (string): The password of the user. It must be at least 6 characters long.

### Example Request:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "userName": "john_doe",
      "email": "john.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "timestamp_here",
      "updatedAt": "timestamp_here"
    }
    }
  ```
  #### Validation Errors:
- **Status Code: 400 Bad Request**
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Invalid Credentials:
- **Status Code: 401 Unauthorized**
- **Response Body:**
  ```json
  {
    "message": "invalid user or password!"
  }
  ```

#### Server Error:
- **Status Code: 500 Internal Server Error**
- **Response Body:**
  ```json
  {
    "error": "Server Error"
  }
  ```