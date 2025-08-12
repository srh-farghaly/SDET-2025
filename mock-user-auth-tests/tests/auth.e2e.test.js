require("dotenv").config({ path: ".env.test" });

const { createUser, authUser, deleteUser } = require('../helpers/apiClient');
const { buildUser, uniqueEmail } = require('../helpers/dataFactory');

let createdUser = null;

beforeEach(() => {
  createdUser = null;
});

afterEach(async () => {
  if (createdUser?.email && createdUser?.password) {
    const loginRes = await authUser({
      email: createdUser.email,
      password: createdUser.password
    });
    if (loginRes.status === 200) {
      await deleteUser({ token: loginRes.body.token });
    }
  }
});

async function createAndTrackUser(user) {
  const createRes = await createUser(user);
  expect([200, 201]).toContain(createRes.status);
  createdUser = user;
}

describe("POST /auth endpoint", () => {

  test("Verify that a newly created user can authenticate and receive a token", async () => {
    const user = buildUser();
    await createAndTrackUser(user);

    const res = await authUser({ email: user.email, password: user.password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    console.log(res.body);
  }, 20000);

 test.each([
    {
      title: "Invalid password should not authenticate the user",
      setup: async () => {
        const user = buildUser();
        await createAndTrackUser(user);
        return { email: user.email, password: "WrongPass!" };
      }
    },
    {
      title: "Invalid email should not authenticate the user",
      setup: async () => {
        return { email: uniqueEmail(), password: "whatever123" };
      }
    }
  ])("$title", async ({ setup }) => {
    const creds = await setup();
    const res = await authUser(creds);

    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty("token");
  }, 20000);

  test.each([
    { name: "Empty email field should not return a token", body: { password: "P@ssw0rd123" } },
    { name: "Empty password field should not returna token", body: { email: uniqueEmail() } },
  ])("$name", async ({ body }) => {
    const res = await authUser(body);
    expect(res.status).toBe(400); 
    expect(res.body).not.toHaveProperty("token");
    expect(res.body).toHaveProperty("message", "Incorrect email or password");
    console.log(res.body);
  }, 20000);

});
