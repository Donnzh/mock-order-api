# Mock Order API

A mock REST API for Order Management System. Contract-first API (OpenAPI 3.0) with in-memory storage - no database required.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`. API docs by swagger available at `/api-docs`.

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

### Using Postman

**Option: Import OpenAPI Spec**

1. Open Postman
2. Click **Import** button
3. Select `openapi.yaml` file
4. Postman will auto-generate a collection
5. Set Authorization: Collection → Variables → `bearer_token` = `test-token`

## Notes

- **In-memory storage**: Data lost on restart
- **Sample data**: 5 orders pre-loaded on startup
- **Versioning**: URL-based (`/api/v1`, `/api/v2`, etc.)

For full API contract, see `openapi.yaml`. For design decisions, see `TRADE_OFFS.md`.
