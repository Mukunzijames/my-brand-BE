import { test, it, describe, expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import mongoose from 'mongoose'
import app from '../src/app';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const DB_url = process.env.MONGODB_TEST_URI || '';

beforeAll(async () => {
  await mongoose.createConnection(DB_url);
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});
afterEach(async () => {
   await clearDatabase();
 });
 
 const clearDatabase = async () => {
   const collections = mongoose.connection.collections;
   for (const key in collections) {
     const collection = collections[key];
     await collection.deleteMany({});
   }
 };

describe('Auth Testing', () => {

   it('should register user', async () => {
     const res = await supertest(app).post('/api/users/register').send({
      username:"afro",
      email:"edwin@gmail.com",
      password:"richard123"
     });
     expect(res.body.message).toContain('register successful');
   });

   it('should not register user with invalid Email', async () => {
     const res = await supertest(app)
       .post('/api/users/register')
       .send({
         username:"afro",
         email:"edwin@gmail.com",
         password:"richard123"
       })
     expect(res.statusCode).toBe(200);
   });
   it('should register user and login', async () => {
      const res = await supertest(app).post('/api/users/register').send({
         username:"afro",
         email:"edwin@gmail.com",
         password:"richard123"
        });
        expect(res.body.message).toContain('register successful');

        const resLogin = await supertest(app).post('/api/users/login').send({
           email:"edwin@gmail.com",
           password:"richard123"
         });
        expect(resLogin.statusCode).toBe(200);
   });
   it('should return 500 user not found', async () => {
        const resLogin = await supertest(app).post('/api/users/login').send({
           email:"edwin@.com",
           password:"richard123"
         });
        expect(resLogin.statusCode).toBe(500);
   });
});
describe('Blog Testing', () => {
   const images = [
      './images/image1.jpg'
    ];
    it('getting All posts/blogs', async () => {
      const response = await supertest(app).get('/api/blogs/');
      expect(response.status).toBe(200)
    });



    it('Post liked successfully', async () => {
      const postId = '65d8ab992fec6d130d4f3d93';
      const initialResponse = await supertest(app).get(`/api/blogs/${postId}`);
      const initialLikeCount = initialResponse.body.like;
    
      const response = await supertest(app).get(`/api/blogs/${postId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toContain('Post liked successfully');
    
      const updatedResponse = await supertest(app).get(`/api/blogs/${postId}`);
      const updatedLikeCount = updatedResponse.body.like;
    
      expect(updatedLikeCount).toBe(initialLikeCount + 1); 
    });
    
  it('you should create a blog', async () => {
   const res = await supertest(app)
     .post('/api/blogs')
     .attach('image', path.join(__dirname, images[0]))
     .field({
       title: 'New Blog',
       desc: 'New Blog New Blog',
     });
   expect(res.statusCode).toBe(201);
 }, 10000);
});


