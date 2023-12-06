const {User} = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    const user = { 
      _id: mongoose.Types.ObjectId().toHexString(),//Convert ObjectId to Hexadecimal string 
      isAdmin: true 
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)//'token' in the request object
    };
    const res = {};//Define 'response' object.We aren't wokring with res. but must pass it as arg to Auth()
    const next = jest.fn();//Set 'next' to a Jest function
    
    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});