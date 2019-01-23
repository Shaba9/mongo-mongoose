require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

let user = null;
describe('them users', () => {
  const createUser = (handle, name = 'Shaba R', email = 'shaba@shabster.com') => User.create({ handle, name, email });

  beforeEach(done => mongoose.connection.dropDatabase(() => done()));

  beforeEach(done => {
    createUser('shabz')
      .then(res => {
        const { _id, __v, handle, text } = res;
        user = { _id: _id.toString(), __v, handle, text };
        console.log('user', user);
        done();
      });
  });

  afterAll(() => mongoose.disconnect());

  it('posts a user', () => {
    return request(app)
      .post('/users')
      .send({
        handle: 'shabz2',
        name: 'Shady',
        email: 'shady@shadester.com'
      })
      .then(res => expect(res.body).toEqual({
        handle: 'shabz2',
        name: 'Shady',
        email: 'shady@shadester.com',
        _id: expect.any(String),
        __v: 0
      }));
  });
});