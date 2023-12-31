const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const { Customer, customerSchema } = require('../../models/customer'); // Import Customer model & customerSchema

let server;

describe('/api/genres', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      const genres = [
        { name: 'genre1' },
        { name: 'genre2' },
      ];
      
      await Genre.collection.insertMany(genres);

      // Use customerSchema
      customerSchema.set('autoIndex', false);

      const res = await request(server).get('/api/genres');
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });
});


// const request = require('supertest');
// const { Genre } = require('../../models/genre');
// const { Customer } = require('../../models/customer');
// const customerSchema = require('../../models/customer').customerSchema;
// const { User } = require('../../models/user');
// const mongoose = require('mongoose');
// const { app } = require('../../index');

// describe('/api/genres', () => {
//   beforeEach(async () => {
//     // Populate your database with necessary data before each test
//     await Genre.deleteMany({});
//     await Customer.deleteMany({});
//     await User.deleteMany({});
//     // Add code to insert genres, customers, and users if needed
//   });

//   afterEach(async () => {
//     // Clean up the database after each test
//     await Genre.deleteMany({});
//     await Customer.deleteMany({});
//     await User.deleteMany({});
//   });

//   describe('GET /', () => {
//     it('should return all genres', async () => {
//       const res = await request(app).get('/api/genres');

//       // Add your assertions based on the response
//       expect(res.status).toBe(200);
//       // Add more assertions based on the structure of your API response
//     });
//   });
// });


// const request = require('supertest');
// const {Genre} = require('../../models/genre');//Use Object Descructuring Systax to import Genre model
// const { Customer } = require('../../models/customer');//Use ODS to import Customer model
// const {User} = require('../../models/user');//Use ODS to import User model
// const mongoose = require('mongoose');

// let server;

// describe('/api/genres', () => {
//   beforeEach(() => { server = require('../../index'); })//Starts server before each test
//   afterEach(async () => { //Closes server after each test
//     server.close(); 
//     await Genre.remove({});//Removes all documents in Genres collection after each test.
//   });

//   describe('GET /', () => {//Test suite for getting all genres
//     it('should return all genres', async () => {
//       const genres = [
//         { name: 'genre1' },
//         { name: 'genre2' },
//       ];
      
//       await Genre.collection.insertMany(genres);//insertMany() enables many documents to be entered into MongoDB

//       const res = await request(server).get('/api/genres');//Sends request to GET genres end point
      
//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(2);
//       expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();//some() checks for object in an array (g=genre)
//       expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
//     });
//   });
// });

//   describe('GET /:id', () => {
//     it('should return a genre if valid id is passed', async () => {
//       const genre = new Genre({ name: 'genre1' });
//       await genre.save();

//       const res = await request(server).get('/api/genres/' + genre._id);//Call endpoint

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty('name', genre.name);//Test that genre has valid name: 'genre1'     
//     });

//     it('should return 404 if invalid id is passed', async () => {
//       const res = await request(server).get('/api/genres/1');//1 is an invalid genre ID
//       expect(res.status).toBe(404);
//     });

//     it('should return 404 if no genre with the given id exists', async () => {//No genres needed for this test
//       const id = mongoose.Types.ObjectId();
//       const res = await request(server).get('/api/genres/' + id);

//       expect(res.status).toBe(404);
//     });
//   });

//   describe('POST /', () => {

//     // Define the happy path, and then in each test, we change 
//     // one parameter that clearly aligns with the name of the 
//     // test. 
//     let token; 
//     let name; 

//     const exec = async () => {
//       return await request(server)
//         .post('/api/genres')
//         .set('x-auth-token', token)
//         .send({ name });
//     }

//     beforeEach(() => {
//       token = new User().generateAuthToken();      
//       name = 'genre1'; 
//     })

//     it('should return 401 if client is not logged in', async () => {
//       token = ''; 

//       const res = await exec();

//       expect(res.status).toBe(401);
//     });

//     it('should return 400 if genre is less than 5 characters', async () => {
//       name = '1234'; 
      
//       const res = await exec();

//       expect(res.status).toBe(400);
//     });

//     it('should return 400 if genre is more than 50 characters', async () => {
//       name = new Array(52).join('a');

//       const res = await exec();

//       expect(res.status).toBe(400);
//     });

//     it('should save the genre if it is valid', async () => {
//       await exec();

//       const genre = await Genre.find({ name: 'genre1' });

//       expect(genre).not.toBeNull();
//     });

//     it('should return the genre if it is valid', async () => {
//       const res = await exec();

//       expect(res.body).toHaveProperty('_id');
//       expect(res.body).toHaveProperty('name', 'genre1');
//     });
//   });

//   describe('PUT /:id', () => {
//     let token; 
//     let newName; 
//     let genre; 
//     let id; 

//     const exec = async () => {
//       return await request(server)
//         .put('/api/genres/' + id)
//         .set('x-auth-token', token)
//         .send({ name: newName });
//     }

//     beforeEach(async () => {
//       // Before each test we need to create a genre and 
//       // put it in the database.      
//       genre = new Genre({ name: 'genre1' });
//       await genre.save();
      
//       token = new User().generateAuthToken();     
//       id = genre._id; 
//       newName = 'updatedName'; 
//     })

//     it('should return 401 if client is not logged in', async () => {
//       token = ''; 

//       const res = await exec();

//       expect(res.status).toBe(401);
//     });

//     it('should return 400 if genre is less than 5 characters', async () => {
//       newName = '1234'; 
      
//       const res = await exec();

//       expect(res.status).toBe(400);
//     });

//     it('should return 400 if genre is more than 50 characters', async () => {
//       newName = new Array(52).join('a');

//       const res = await exec();

//       expect(res.status).toBe(400);
//     });

//     it('should return 404 if id is invalid', async () => {
//       id = 1;

//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it('should return 404 if genre with the given id was not found', async () => {
//       id = mongoose.Types.ObjectId();

//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it('should update the genre if input is valid', async () => {
//       await exec();

//       const updatedGenre = await Genre.findById(genre._id);

//       expect(updatedGenre.name).toBe(newName);
//     });

//     it('should return the updated genre if it is valid', async () => {
//       const res = await exec();

//       expect(res.body).toHaveProperty('_id');
//       expect(res.body).toHaveProperty('name', newName);
//     });
//   });  

//   describe('DELETE /:id', () => {
//     let token; 
//     let genre; 
//     let id; 

//     const exec = async () => {
//       return await request(server)
//         .delete('/api/genres/' + id)
//         .set('x-auth-token', token)
//         .send();
//     }

//     beforeEach(async () => {
//       // Before each test we need to create a genre and 
//       // put it in the database.      
//       genre = new Genre({ name: 'genre1' });
//       await genre.save();
      
//       id = genre._id; 
//       token = new User({ isAdmin: true }).generateAuthToken();     
//     })

//     it('should return 401 if client is not logged in', async () => {
//       token = ''; 

//       const res = await exec();

//       expect(res.status).toBe(401);
//     });

//     it('should return 403 if the user is not an admin', async () => {
//       token = new User({ isAdmin: false }).generateAuthToken(); 

//       const res = await exec();

//       expect(res.status).toBe(403);
//     });

//     it('should return 404 if id is invalid', async () => {
//       id = 1; 
      
//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it('should return 404 if no genre with the given id was found', async () => {
//       id = mongoose.Types.ObjectId();

//       const res = await exec();

//       expect(res.status).toBe(404);
//     });

//     it('should delete the genre if input is valid', async () => {
//       await exec();

//       const genreInDb = await Genre.findById(id);

//       expect(genreInDb).toBeNull();
//     });

//     it('should return the removed genre', async () => {
//       const res = await exec();

//       expect(res.body).toHaveProperty('_id', genre._id.toHexString());
//       expect(res.body).toHaveProperty('name', genre.name);
//     });
//   });  
//});