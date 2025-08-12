require('dotenv').config({ path: '.env.test' });

const { createUser, authUser, deleteUser, getMe } = require('../helpers/apiClient');
const { buildUser } = require('../helpers/dataFactory');

let ctx = { token: null, deleted: false };

afterEach(async () => {
  if (ctx.token && !ctx.deleted) {
    try { await deleteUser({ token: ctx.token }); } catch (_) {}
  }
  ctx = { token: null, deleted: false };
});

describe('DELETE /users — Delete User by Token', () => {
  test('Verify user can be deleted with a valid token, and that the token becomes invalid afterward', async () => {

    const user = buildUser();
    const createRes = await createUser(user);
    expect([200, 201]).toContain(createRes.status);

    const loginRes = await authUser({ email: user.email, password: user.password });
    expect(loginRes.status).toBe(200);
    ctx.token = loginRes.body.token;
    const delRes = await deleteUser({ token: ctx.token });
    expect(delRes.status).toBe(200);
    expect(delRes.body).toHaveProperty('message', 'User deleted with success!');
    ctx.deleted = true;
    const meRes = await getMe({ token: ctx.token });
    expect([401, 403]).toContain(meRes.status);
  }, 20000);

  test('Verify deletion is rejected when Authorization header is missing', async () => {
    const res = await deleteUser({ token: '' }); // no header value
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  }, 20000);

  test('Verify deletion is rejected when Authorization header is invalid', async () => {
    const res = await deleteUser({ token: 'not.a.valid.token' });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  }, 20000);

  test('Verify that if a user is deleted it cannot be deleted again', async () => {

    const user = buildUser();
    await createUser(user);
    const login = await authUser({ email: user.email, password: user.password });
    ctx.token = login.body.token;
    const first = await deleteUser({ token: ctx.token });
    expect(first.status).toBe(200);
    ctx.deleted = true;
    const second = await deleteUser({ token: ctx.token });
    expect([401, 403, 404]).toContain(second.status);
  }, 20000);
});
