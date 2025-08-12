require('dotenv').config({ path: '.env.test' });

const {
  createUser,
  authUser,
  getMe,
  deleteAllUsers,
} = require('../helpers/apiClient');
const { buildUser } = require('../helpers/dataFactory');

describe('DELETE /all-users — Admin purge', () => {
  test('deletes ALL users with a valid admin key (200)', async () => {
    const u1 = buildUser();
    const u2 = buildUser();

    await createUser(u1);
    await createUser(u2);

    const t1 = (await authUser({ email: u1.email, password: u1.password })).body.token;
    const t2 = (await authUser({ email: u2.email, password: u2.password })).body.token;

    const delAll = await deleteAllUsers(); 
    expect(delAll.status).toBe(200);
    expect(delAll.body).toHaveProperty('message', 'Users deleted with success');

    const me1 = await getMe({ token: t1 });
    const me2 = await getMe({ token: t2 });
    expect([401, 403]).toContain(me1.status);
    expect([401, 403]).toContain(me2.status);
  }, 20000);

  test('rejects when admin key is missing', async () => {
    const res = await deleteAllUsers('');
    expect([400, 401, 403]).toContain(res.status);
    expect(res.body).toHaveProperty('message');
  }, 20000);

  test('rejects when admin key is wrong', async () => {
    const res = await deleteAllUsers('not-the-key');
    expect([401, 403]).toContain(res.status);
    expect(res.body).toHaveProperty('message');
  }, 20000);

  test('Verify deleting all users twice returns expected status codes', async () => {
    const u = buildUser();
    await createUser(u);
    const first = await deleteAllUsers();
    expect(first.status).toBe(200);
    const second = await deleteAllUsers();
    expect([200, 204, 404]).toContain(second.status);
  }, 20000);
});
