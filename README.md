# Mock Order API

A mock REST API for Order Management System. Contract-first API (OpenAPI 3.0) with in-memory storage - no database required.

[![Swagger UI](https://img.shields.io/badge/Swagger-API%20Docs-blue)](http://98.91.199.104:3000/api-docs/)

This API is deployed on an AWS EC2 instance (public IP: `98.91.199.104`).

Swagger docs (deployed): http://98.91.199.104:3000/api-docs/

## Quick Start

Runs locally

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`. API docs by swagger available at `/api-docs`.

Note: The deployed demo accepts any Bearer token and is intended for development/testing only. Do not use for sensitive or production data.

## Endpoints

Base URL: `/api/v1`

**Authentication**: All endpoints require Bearer token in header:

```
Authorization: Bearer <token>
```

_Note: Any token is accepted for this mock API._

### Create Order

```
POST /api/v1/orders
Body: { "customerId": "CUST-001", "placementDate": "2024-01-15T10:30:00Z" }
```

### Search Orders

```
GET /api/v1/orders?customerId=CUST-001&from=2024-01-01&to=2024-01-31
```

### Update Order Status

```
PATCH /api/v1/orders/{orderId}/status
Body: { "status": "SHIPPED" }
```

Valid statuses: `PLACED`, `SHIPPED`, `CANCELLED`

## Error Format

```json
{
  "error": "Error message"
}
```

Status codes: `400` (Bad Request), `401` (Unauthorized), `404` (Not Found), `500` (Server Error)

## Testing

1. Start server: `npm start`
2. Open http://localhost:3000/api-docs
3. Click "Authorize" → enter any token → test endpoints

Alternatively, view the live docs at: http://98.91.199.104:3000/api-docs/

### Using Postman

** Import the included Postman collection**

1. Open Postman
2. Click Import → File and choose `postman_collection.json` from this repo
3. The collection "Mock Order API" will be added to your workspace
4. Open the collection's variables (or the environment) and set:

- `baseUrl` = `http://98.91.199.104:3000/api/v1` (or `http://localhost:3000/api/v1` for local testing)
- `bearer_token` = `test-token`

5. Select a request, click "Send". The collection uses `{{baseUrl}}` and Bearer auth.

Alternatively, you can still import `openapi.yaml` if you prefer generating the collection from the spec.

## Notes

- **In-memory storage**: Data lost on restart
- **Sample data**: 5 orders pre-loaded on startup
- **Versioning**: URL-based (`/api/v1`, `/api/v2`, etc.)

For full API contract, see `openapi.yaml`. For design decisions, see `TRADE_OFFS.md`.
