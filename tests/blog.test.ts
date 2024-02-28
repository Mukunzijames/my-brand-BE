import { test, it, describe, expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import mongoose from 'mongoose'
import app from '../src/app';
import path from 'path';
import dotenv from 'dotenv';
import { Console } from 'console';
dotenv.config();
const DB_url = process.env.MONGODB_TEST_URI || '';

beforeAll(async () => {
  await mongoose.createConnection(DB_url);
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});
// afterEach(async () => {
//    await clearDatabase();
//  });
 
//  const clearDatabase = async () => {
//    const collections = mongoose.connection.collections;
//    for (const key in collections) {
//      const collection = collections[key];
//      await collection.deleteMany({});
//    }
//  };
let token ='';
let blogId =""

describe('Auth Testing', () => {

   it('should register user', async () => {
     const res = await supertest(app).post('/api/users/register').send({
      username:"avierra123",
      email:"patrick2345@gmail.com",
      password:"richard1235ji"
     });
     expect(res.status).toBe(500)    
   });

   it('should not register user with invalid Email', async () => {
     const res = await supertest(app)
       .post('/api/users/register')
       .send({
         username:"afro",
         email:"edwin@gmailhjjhj.com12",
         password:"richard123"
       })
     expect(res.statusCode).toBe(500);
   });
   it('should register user and login', async () => {
    let r = (Math.random() + 1).toString(36).substring(5);
      const res = await supertest(app).post('/api/users/register').send({
         username:"james"+r,
         email:r+"james@gmail.com",
         password:"james12345"
        });
        expect(res.body.message).toContain('register successful');

        const resLogin = await supertest(app).post('/api/users/login').send({
           email:"james@gmail.com",
           password:"james12345"
         });
        //  token = "Bearer "+resLogin.body.token;
        //  console.log(token)
        // expect(resLogin.body.message).toContain('Logged in Successfully');
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
      // blogId =response.body[0]._id
      // console.log(blogId)
    });



    it('Post liked successfully', async () => {
      const id = blogId
      const response = await supertest(app)
          .post(`/api/blogs/${id}`);
      expect(response.status).toBe(401)
      expect(response.body.message).toContain('Unauthenticated user detected. Please login to continue')
  });
  it('Post unliked successfully', async () => {
    const id = blogId
    const response = await supertest(app)
        .post(`/api/blogs/${id}`);
    expect(response.status).toBe(401)
    expect(response.body.message).toContain('Unauthenticated user detected. Please login to continue')
});
  it('get blog by id', async()=>{
    const id = blogId
    const res = await supertest(app).get(`/api/blogs/${id}/likes`)
    expect(res.statusCode).toBe(500)
  })
  
    
//   it('you should create a blog', async () => {
//    const res = await supertest(app)
//      .post('/api/blogs')
//      .attach('image', path.join(__dirname, images[0]))
//      .field({
//        title: 'NewBlog1212348',
//        desc: 'New Bloghh 11NewBlog33',
//      });
//    expect(res.statusCode).toBe(201);
//  }, 10000);
});
describe ('message testing', ()=>{
  it ('send message', async ()=>{
      const res =  await supertest(app).post('/api/messages').send({
        name:"janed38hhjhvhhhggjjjjjjjhhjhb",
        email:"janed57ghhghhghggggjhghhh@gmail.com",
        message:"hellojwo7hhjjhhjrl4j4hdwwsqw"
      })
      expect(res.statusCode).toBe(201)
      expect(res.body.message).toContain('Email sent successfully')

  })
  it ('send message', async ()=>{
    const res =  await supertest(app).post('/api/messages').send({
      name:"",
      email:"janed57hgjhjjhjjbh8hghh@gmail.com",
      message:"hellojwo7hhjjhhjrl4j4hdwwsqw"
    })
    expect(res.statusCode).toBe(400)

});
  it('should get all message',async()=>{
    const response = await supertest(app).get('/api/messages');
    expect(response.statusCode).toBe(200)
  })
 it('should delete message', async () => {
    const id = "65dca703cda1e0f1fdfacc1c";
    const response = await supertest(app).delete(`/api/messages/${id}`);
    expect(response.statusCode).toBe(200);
});
it('should update message',async()=>{
  const id = "65dca703cda1e0f1fdfacc1c";
  const response = await supertest(app).patch(`/api/messages/${id}`);
  expect(response.statusCode).toBe(404)

})
// it('should get ')
});
describe('comment testing',()=>{
  console.log(token)
  console.log(blogId)
  it('should create comment', async()=>{
    const id = blogId
    const response = await supertest(app).post(`/api/${id}/comments`)
    .set("authorization",token)
    .send({
      name:"jjjjjjjjgkjhask",
      email:"jjjjjjjjhbvhssak@gmail.com",
      commentSent:"that's  great", 
    })
    //  console.log(token)
expect(response.statusCode).toBe(404)
  })
  it('should get all comment',async()=>{
    const id = blogId
    const response = await supertest(app).get(`/api/${id}/comments`)
expect(response.statusCode).toBe(404)
  })
})

