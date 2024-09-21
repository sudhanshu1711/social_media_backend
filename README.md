# Social Media Backend

This is the backend for a social media platform built with Node.js, Express.js, MongoDB, and JWT-based authentication. It supports essential features like user authentication, post creation, liking/unliking posts, and following/unfollowing users.

## Features

- **User Authentication**
  - Register, login, and logout functionalities with JWT authentication.
  
- **User Profile**
  - Users can update their profiles, including name, email, and profile picture.

- **Posts**
  - Users can create posts with descriptions and images.
  - Ability to like and unlike posts.

- **Follow System**
  - Users can follow and unfollow each other.
  
- **Error Handling**
  - Custom error handling for smooth and consistent API responses.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and post data.
- **Mongoose**: MongoDB ODM (Object Data Modeling) for handling database operations.
- **JWT (JSON Web Token)**: For secure user authentication.
- **bcrypt**: For hashing user passwords.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user.
- `POST /api/v1/auth/login` - Log in a user.

### Users
- `PATCH /api/v1/users/:id/follow` - Follow a user.
- `PATCH /api/v1/users/:id/unfollow` - Unfollow a user.
- `PATCH /api/v1/users/update-account` - Update user account details.

### Posts
- `POST /api/v1/posts` - Create a new post.
- `PATCH /api/v1/posts/:id/like` - Like a post.
- `PATCH /api/v1/posts/:id/unlike` - Unlike a post.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/social-media-backend.git
