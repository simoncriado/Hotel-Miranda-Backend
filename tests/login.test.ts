import request from "supertest";
import app from "../src/app";

describe("Login test", (): void => {
  test("Login OK", async (): Promise<void> => {
    const response = await request(app).post("/login").send({
      email: "test@test.com",
      password: "12345",
    });

    expect(response.statusCode).toBe(200);
  });

  test("Login KO", async (): Promise<void> => {
    const response = await request(app).post("/login").send({
      email: "incorrect@email.com",
      password: "incorrect",
    });

    expect(response.statusCode).toBe(401);
  });
});
