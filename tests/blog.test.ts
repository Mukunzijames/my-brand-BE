import { test, it, describe, expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';

import mongoose from 'mongoose'
import app from '../src/app';
import path from 'path';
import Post, { Ipost } from "../src/models/blog"
import dotenv from 'dotenv';


dotenv.config();

const DB_url = process.env.MONGODB_TEST_URI || '';

beforeAll(async () => {
 await mongoose.connect("mongodb+srv://jimmy:jimmy123@jimmy.pxitdka.mongodb.net/?retryWrites=true&w=majority&appName=jimmy")
  //await mongoose.createConnection(DB_URL2);
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
let ids=''

describe('Auth Testing', () => {

   it('should register user', async () => {
     const res = await supertest(app).post('/api/users/register').send({
      username:"avierra123",
      email:"patrick2345@gmail.com",
      password:"richard1235ji"
     });
     expect(res.status).toBe(200)    
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
          email:"patrick2345@gmail.com",
          password:"richard1235ji"
         });
         expect(resLogin.statusCode).toBe(200)
         token=resLogin.body.token

     
   }); 
   it('should return 500 user not found', async () => {
        const resLogin = await supertest(app).post('/api/users/login').send({
           email:"edwin@.com",
           password:"richard123"
         });
        expect(resLogin.statusCode).toBe(500);
   });
   let blogId:any=''
describe('Blog Testing', () => {
  
   const images = [
      './images/image1.jpg'
    ];

 let r = (Math.random() + 1).toString(36).substring(5);
    let blogs={  title: "this blog is final hh 2324"+r,
                 desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                 image: "image.png"}



    it('getting All posts/blogs', async () => {
      const blog= await Post.create(blogs)
      const response = await supertest(app).get('/api/blogs');
      expect(response.status).toBe(200)
    });

    it('get a single posts/blogs', async () => {
      const response1 = await supertest(app).get('/api/blogs');
       const blogList:string=response1.body,
       blogId =response1.body[blogList.length-1]._id
       ids=blogId
      const response = await supertest(app).get(`/api/blogs/${blogId}`);
      expect(response.status).toBe(200)
   
    });

    it('get unexisting single posts/blogs', async () => {
      const response = await supertest(app).get(`/api/blogs/65e0628b855cedbb9bce7368kk`);
      expect(response.status).toBe(500)
     
    });


    it('update single posts/blogs unauthenticated', async () => {
      const response = await supertest(app).patch(`/api/blogs/${ids}`).
      send({title:"test patching blog"})

      expect(response.statusCode).toBe(401)
    });

    it('update single posts/blogs with inavalid id', async () => {
      const response = await supertest(app).patch(`/api/blogs/65e0628b855cedbb9bce7368kk`)
      .set("Authorization",`Bearer ${token}`);
      expect(response.status).toBe(500)
     
    });

   


    it('sending a comment to posts/blogs successful', async () => {
     const response = await supertest(app).get(`/api/blogs/${ids}/comments`)
     .send({
      name:"emmanuel",
       email:"emmy@gmail.com", 
       commentSent:"test of comment"
     })
     .set("Authorization",`Bearer ${token}`);
      expect(response.status).toBe(200)
    });

    it('sending a comment to posts/blogs unauthenticated user', async () => {
     const response = await supertest(app).post(`/api/blogs/${ids}/comments`);
      expect(response.status).toBe(401)
    });

    it('get all comment to posts/blogs unauthenticated user', async () => {
      const response = await supertest(app).get(`/api/blogs/${ids}/comments`)
       expect(response.status).toBe(401)
     });

     it('get all comment to posts/blogs successful', async () => {
      const response = await supertest(app).post(`/api/blogs/${ids}/comments`)
      .set("Authorization",`Bearer ${token}`);
       expect(response.status).toBe(201)
     });
 







    it('Post liked not authenticated', async () => {
      const id = blogId
      const response = await supertest(app)
          .post(`/api/blogs/${id}/likes`);
      expect(response.status).toBe(401)
      expect(response.body.message).toContain('Unauthenticated user detected. Please login to continue')
      
  
    });

    it('Post liked to authenticated', async () => {
      const id = blogId
      const response = await supertest(app)
          .post(`/api/blogs/${ids}/likes`)
      .set("Authorization",`Bearer ${token}`);
      expect(response.status).toBe(200)
    });

    it('Post liked to unexisting blog id ', async () => {
      const response = await supertest(app)
          .post(`/api/blogs/65e06b0eeb86efe8076659a4/likes`)
          .set("Authorization",`Bearer ${token}`);
      expect(response.status).toBe(404)
  
    });

    it('Post liked to unexisting blog id ', async () => {
      const response = await supertest(app)
          .post(`/api/blogs/65e06b0eeb86efe8076659a477/likes`)
          .set("Authorization",`Bearer ${token}`);
      expect(response.status).toBe(500)
  
    });

  it('Post unliked to unauthenticated user', async () => {

    const response = await supertest(app)
        .post(`/api/blogs/${ids}/likes`);
    expect(response.status).toBe(401)
    expect(response.body.message).toContain('Unauthenticated user detected. Please login to continue')
   
  });

  it('Post unliked successfully ', async () => {
    const response = await supertest(app)
        .post(`/api/blogs/${ids}/likes`)
        .set("Authorization",`Bearer ${token}`);
    expect(response.status).toBe(200)

  });

  it('Post unliked to unexisting blog id ', async () => {
    const response = await supertest(app)
        .post(`/api/blogs/65e06b0eeb86efe8076659a4/likes`)
        .set("Authorization",`Bearer ${token}`);
    expect(response.status).toBe(404)

  });

  it('Post unliked to unexisting blog id ', async () => {
    const response = await supertest(app)
        .post(`/api/blogs/65e06b0eeb86efe8076659a4uuuu/likes`)
        .set("Authorization",`Bearer ${token}`);
    expect(response.status).toBe(500)
    
  });

  it('update single posts/blogs successfull', async () => {

    const response = await supertest(app).delete(`/api/blogs/${ids}`)
    .set("Authorization",`Bearer ${token}`);
  
    expect(response.statusCode).toBe(200)
    
  });


});

 describe ('message testing', ()=>{

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
  
  it('should create comment', async()=>{
    const id=''
    const response = await supertest(app).post(`/api/${id}/comments`)
    .set("authorization",token)
    .send({
      name:"jjjjjjjjgkjhask",
      email:"jjjjjjjjhbvhssak@gmail.com",
      commentSent:"that's  great", 
    })

expect(response.statusCode).toBe(404)
  })
  it('should get all comment',async()=>{
    const id = blogId
    const response = await supertest(app).get(`/api/${id}/comments`)
expect(response.statusCode).toBe(404)

  })
})
});
