function uniqueEmail() {
  return `user_${Date.now()}_${Math.floor(Math.random() * 1e3)}@example.com`;
}

function buildUser(overrides = {}) {
  return {
    name: 'Test User',
    email: uniqueEmail(),
    password: 'P@ssw0rd123',
    ...overrides,
  };
}

module.exports = { uniqueEmail, buildUser };
