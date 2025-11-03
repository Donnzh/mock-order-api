import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import orderRouter from "../routes/order.route";
import { authenticateToken } from "./middleware/auth.middleware";

const app: Express = express();

app.use(express.json());

// Load OpenAPI spec
const openApiSpecPath = path.join(process.cwd(), "openapi.yaml");
const swaggerDocument = YAML.load(openApiSpecPath);

// Swagger UI setup
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Mock Order API Documentation",
  })
);

// Apply authentication middleware to all API routes
app.use("/api/v1", authenticateToken);

// Order routes
app.use("/api/v1/orders", orderRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err: unknown, req: Request, res: Response) => {
  const message = err instanceof Error ? err.message : "Internal Server Error";
  res.status(500).json({ error: message });
});

export const server = app;
