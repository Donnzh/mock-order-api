import request from "supertest";
import express from "express";
import orderRouter from "../routes/order.route";
import { authenticateToken } from "../src/middleware/auth.middleware";

const app = express();
app.use(express.json());
app.use("/api/v1", authenticateToken);
app.use("/api/v1/orders", orderRouter);

describe("Order API", () => {
  const authToken = "test-token";

  it("should create a new order", async () => {
    const response = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ customerId: "CUST-001" });

    expect(response.status).toBe(201);
    expect(response.body.customerId).toBe("CUST-001");
    expect(response.body.status).toBe("PLACED");
  });

  it("should return 400 if customerId is missing when create order", async () => {
    const response = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${authToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("customerId");
  });

  it("should search orders with customerId", async () => {
    const response = await request(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${authToken}`)
      .query({ customerId: "CUST-001" });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 400 if customerId is missing in search", async () => {
    const response = await request(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("customerId");
  });

  it("should update order status", async () => {
    // Create an order first
    const createResponse = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ customerId: "CUST-002" });

    const orderId = createResponse.body.orderId;

    // Update status
    const updateResponse = await request(app)
      .patch(`/api/v1/orders/${orderId}/status`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ status: "SHIPPED" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.status).toBe("SHIPPED");
  });
});
