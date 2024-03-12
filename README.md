[![Node.js CI](https://github.com/Mukunzijames/my-brand-BE/actions/workflows/testing.yml/badge.svg)](https://github.com/Mukunzijames/my-brand-BE/actions/workflows/testing.yml)
[![Coverage Status](https://coveralls.io/repos/github/Mukunzijames/my-brand-BE/badge.svg?branch=main)](https://coveralls.io/github/Mukunzijames/my-brand-BE?branch=main)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white)
 ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) 

# MY-BRAND-BE

**MY-BRAND-BE** is the backend part of [**MY-BRAND-BE-MUKUNZI james**](https://mukunzijames.netlify.app/.html), which is my my personal portofolio + blog helping the owner to market themselves and interact with users through blog comments and a contact page.

### Technology used in MyBrand-BE

- **Node.js**
- **circle-ci**
- **github-action**
- **coveralls**
- **Express.js**
- **MongoDB**
- **TypeScript**
- **Passport.js and jsonwebtoken for user authentication**

**Package Management Tool:**
- npm

**Image Upload:**
- Cloudinary Image
-multer

### How to Test My Project

Since the project backend is implemented with various API endpoints, to test the project, I use Postman as an application for testing APIs.

### All API Endpoints for My Project

**Test Link:** [API Documentation](https://my-brand-be-2-iaek.onrender.com/swagger/#/)

**1. Endpoints for Blogs:**

- **GET /api/blogs**: View all blogs (public)
- **POST /api/blogs**: Create a new blog (authorized access only)
- **GET /api/blogs/:id**: View a single blog (public)
- **PATCH /api/blogs/:id**: Update a blog (authorized access only)
- **DELETE /api/blogs/:id**: Delete a single blog (authorized access only)

**2. Endpoints for Blog Comments:**

- **GET /api/blogs**: View all blogs (public)
- **POST /api/blogs:id/comments**: Create a new comment for a single blog (authenticated users)
- **GET /api/blogs/:id/comments**: View all comments for a single blog (public)
- **DELETE /api/comments/:id**: Delete a single comment (authorized access only)

**3. Endpoints for Liking a Blog:**

- **POST /api/blogs:id/likes**: Like or dislike a single blog (authenticated users)

**4. Endpoints for Client Contact (Queries):**

- **GET /api/messages**: View all queries (authorized access only)
- **POST /api/messages**: Allow clients to send a query (public)
- **DELETE /api/messages/:id**: Delete a single client query (authorized access only)

**3. Endpoint for login:**

- **POST /api/users/register**: register user
- **POST /api/users/login**:login user
- **GET /api/users/profile**: to see the profile

### How to Test Project Locally

1. Clone this repo from the following link: [MY-BRAND-BE Repository](https://github.com/Mukunzijames/my-brand-BE)
2. Run `npm install`
3. Run `npm run start`
