# Trade-offs and Design Decisions

Key design decisions and trade-offs for the Mock Order API.

## 1. OpenAPI (REST) over GraphQL

**Decision**: REST API with OpenAPI.

**Rationale**: Better tooling (Swagger UI, Postman), clearer contract, easier URL-based versioning.

**Trade-off**: Less flexible queries than GraphQL, but sufficient for required operations.

## 2. Bearer Token Authentication

**Decision**: Bearer token (JWT-compatible) over Basic Auth (HTTP Basic Authentication).

**Rationale**: Industry standard, revocable tokens (no need change user password), better scalability (stateless), easier front-end integration.

**Trade-off**: Slightly more complex than Basic Auth (create with secret, set expiration, verification), but better security posture and suitable in mock api. Note: Mock accepts any token; production should verify JWT.

## 3. URL-based Versioning

**Decision**: Version in URL path (`/api/v1`, `/api/v2`).

**Rationale**: Explicit (version is visible), backward compatible (both version can co-existing), works with all tools (swagger, postman).

**Trade-off**: URL need changes between versions.

## 4. In-Memory Storage

**Decision**: In-memory array instead of database.

**Rationale**: No dependencies, fast startup, simple for development/testing.

**Trade-off**: Data lost on restart (intentional), not production-ready.

## 5. Simple Error Model

**Decision**: `{ error: string }` format for all errors.

**Rationale**: Simple, consistent, human-readable, sufficient for mock.

**Trade-off**: Less structured than error codes.

## 6. Sequential Order IDs

**Decision**: Sequential IDs (`order-1`, `order-2`) instead of UUIDs.

**Rationale**: Readable, predictable for testing, no dependencies.

**Trade-off**: Not globally unique. _Production: Use UUIDs._

## 7. No Idempotency

**Decision**: POST creates new order each time (not idempotent).

**Rationale**: Simpler for mock, clear REST semantics.

**Trade-off**: Potential duplicates on retries (like network retries, double click). _Production: Add idempotency keys both client request header and router idempotency key check._

## 8. TypeScript + Express

**Decision**: TypeScript with Express.js.

**Rationale**: Type safety, industry standard, robust ecosystem, excellent tools support.

**Trade-off**: More setup than JavaScript, but better maintainability.

## Summary

The design focuses on simplicity as it's a mock API for front-end development, while also providing structure for future development. This approach balances quick update for front-end teams with a clear contract for guide vendor implementation.
