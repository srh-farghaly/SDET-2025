require('dotenv').config({ path: '.env.test' });

const { createUser, authUser, deleteUser, getMe } = require('../helpers/apiClient');
const { buildUser } = require('../helpers/dataFactory');

let createdToken = null;
let createdUser = null;

afterEach(async () => {
  if (createdToken) {
    await deleteUser({ token: createdToken });
    createdToken = null;
  }
});

describe('GET /users — Fetch user by token', () => {
  test('Verify that user data are correctly returned with a valid token', async () => {
    const user = buildUser();
    await createUser(user);
    const loginRes = await authUser({ email: user.email, password: user.password });
    expect(loginRes.status).toBe(200);
    createdToken = loginRes.body.token;
    createdUser = user;
    const res = await getMe({ token: createdToken });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
    });
  }, 20000);

   test('Verify that user data cannot be fetched when token is missing', async () => {
    const res = await getMe({ token: '' }); 
    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty('id');
    expect(res.body).not.toHaveProperty('email');
    expect(res.body).not.toHaveProperty('password');
    expect(res.body).not.toHaveProperty('imageUrl');
    expect(res.body).not.toHaveProperty('name');
    expect(res.body).toHaveProperty('message', 'Unauthorized')
  }, 20000);
  
    test('Verify that user data cannot be fetched when token is invalid', async () => {
    const res = await getMe({ token: 'this.is.not.a.valid.token' });
    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty('id');
    expect(res.body).not.toHaveProperty('email');
    expect(res.body).not.toHaveProperty('password');
    expect(res.body).not.toHaveProperty('imageUrl');
    expect(res.body).not.toHaveProperty('name');
  }, 20000);

  test('rejects when user was deleted but old token is used (401)', async () => {
    const user = buildUser();
    const createRes = await createUser(user);
    expect(res.status).toBe(200);
    const loginRes = await authUser({ email: user.email, password: user.password });
    expect(loginRes.status).toBe(200);
    const token = loginRes.body.token;
    await deleteUser({ token });
    const res = await getMe({ token });
    expect(res.status).toBe(401);
  }, 20000);
});
