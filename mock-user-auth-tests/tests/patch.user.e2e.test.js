require('dotenv').config({ path: '.env.test' });

const { createUser, updateUser, deleteUser,authUser } = require('../helpers/apiClient');
const { buildUser } = require('../helpers/dataFactory');

let createdToken = null;
let createdUser = null;

beforeEach(async () => {
  const user = buildUser();
  const createRes = await createUser(user);
  expect([200, 201]).toContain(createRes.status);

  const loginRes = await authUser({ email: user.email, password: user.password });
  expect(loginRes.status).toBe(200);

  createdToken = loginRes.body.token;   
  createdUser = user;
});

afterEach(async () => {
  if (createdToken) {
    await deleteUser({ token: createdToken });
    createdToken = null;
    createdUser = null;
  }
});

describe('PATCH /users — Update User by Token', () => {

  test('Verify that user updates name, email, and password with a valid token', async () => {
    const updatedData = buildUser();
    
    console.log(`value of created token is as follow: ${createdToken}`);
    const res = await updateUser({ token: createdToken, body: updatedData });

    expect(res.status).toBe(200);
    console.log(res.body);
    expect(res.body).toHaveProperty('message', 'User updated with success!');
  });

  test('Verify that user can update just the name (partial update works)', async () => {
    const res = await updateUser({ token: createdToken, body: { name: 'NewNameOnly' } });
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'User updated with success!');
  });

  test('Veridy that data cannot be updated when token is missing', async () => {
    const res = await updateUser({ token: '', body: { name: 'NoAuthUser' } });
    console.log(res.body);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message','jwt must be provided');
  });

  test('Veridy that data cannot be updated when token is invalid', async () => {
    const res = await updateUser({ token: 'invalidToken123', body: { name: 'InvalidTokenUser' } });
    console.log(res.body);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message','invalid signature');
  });


  test('rejects using an email that already belongs to another user', async () => {
    const otherUser = buildUser();
    const otherRes = await createUser(otherUser);
    expect(otherRes.status).toBe(200);
    const res = await updateUser({ token: createdToken, body: { email: otherUser.email } });
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
    // must return email used or any validation error.
  });
});
