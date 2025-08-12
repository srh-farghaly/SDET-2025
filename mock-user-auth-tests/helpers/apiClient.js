const path = require('path');
const request = require('supertest');

if (!process.env.BASE_URL) {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') });
}

const baseURL = process.env.BASE_URL || 'http://localhost:3001/api/v1';
const api = () => request(baseURL);

const authHeader = (token) => token || '';


/** POST /users */
async function createUser({ name, email, password }) {
  return api().post('/users').send({ name, email, password });
}

/** PATCH /users */
async function updateUser({ token, body }) {
  return api().patch('/users').set('Authorization',token).send(body);
}

/** GET /user*/
async function getMe({ token }) {
  return api().get('/users').set('Authorization', token);
}


/** DELETE /user (self) */
async function deleteUser({ token }) {
  return api().delete('/users').set('Authorization', token);
}

// ---------- AUTH ----------
/** POST /auth */
async function authUser({ email, password }) {
  return api().post('/auth').send({ email, password });
}

function withAuth({ token }) {
 
  return {
    get: (url) => api().get(url).set('Authorization', token),
    post: (url) => api().post(url).set('Authorization', token),
    patch: (url) => api().patch(url).set('Authorization', token),
    delete: (url) => api().delete(url).set('Authorization', token),
  };
}

// DELETE /all-users (admin)
async function deleteAllUsers(adminKey = process.env.ADMIN_KEY) {
  return api()
    .delete('/all-users')
    .send({ key_admin: adminKey });
}

module.exports = {
  api,
  createUser,
  authUser,
  getMe,
  updateUser,
  deleteUser,
  withAuth,
  deleteAllUsers
};
