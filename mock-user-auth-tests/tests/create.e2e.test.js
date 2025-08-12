require('dotenv').config({ path: '.env.test' });

const { createUser, deleteUser } = require('../helpers/apiClient');
const { buildUser } = require('../helpers/dataFactory');

let createdToken = null;

afterEach(async () => {
  if (createdToken) {
    await deleteUser({ token: createdToken });
    createdToken = null;
  }
});

describe('POST /users — User Creation', () => {
  test('creates a user successfully and returns a token', async () => {
    const user = buildUser();
    const res = await createUser(user);
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('message', 'User registered with success');
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
    createdToken = res.body.token;
  }, 20000);



  test.each([
  {
    name: 'Verify that user cannot be created without a password',
    body: () => buildUser({ password: undefined }),
    expectedMessage: 'Password is required'
  },
  {
    name: 'Verify that user cannot be created without an Email',
    body: () => buildUser({ email: undefined }),
    expectedMessage: 'Email is required'
  }
])('$name', async ({ body, expectedMessage }) => {
  const user = body();
  const res = await createUser(user);
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('message', expectedMessage);
  expect(res.body).not.toHaveProperty('token');
});

 

  test("Verify that User cannot be created twice", async () => {
  
  const user = buildUser(); 

  const firstRes = await createUser(user);
  expect(firstRes.status).toBe(200);
  const duplicateRes = await createUser(user);
  expect(duplicateRes.status).toBe(400);
  expect(duplicateRes.body).toHaveProperty("message", "User already registered");
  expect(duplicateRes.body).not.toHaveProperty("token");
});

});

