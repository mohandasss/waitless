# Backend Architecture Review

Date: 2026-05-27

This review covers the current backend implementation in `backend/` and focuses on architecture quality, engineering practices, risks, and the amount of remaining work to reach a more production-ready shape.

## Executive Summary

The backend already has a sensible MVP foundation: Express entry points, a Prisma-based persistence layer, an auth-oriented route split, request validation middleware, a reusable rate limiter, and a single Prisma client wrapper. The overall structure is readable and the code is organized into the expected layers.

The main gaps are not framework-level. They are around consistency, security hardening, error handling, and domain boundaries. The current auth flow works as a prototype, but several implementation details mix responsibilities or rely on shortcuts that should be cleaned up before scaling.

## Architecture Map

- `src/app.ts` sets up the HTTP app, CORS, JSON parsing, and route mounting.
- `src/server.ts` starts the process and handles a minimal shutdown path.
- `src/routes/auth.routes.ts` routes requests through validation, rate limiting, then controllers.
- `src/controllers/auth.controller.ts` translates HTTP input into service calls and returns API responses.
- `src/services/auth.service.ts` handles OTP orchestration, salon registration, and verification flow.
- `src/services/otp.service.ts` creates and persists OTPs, with optional Twilio delivery.
- `src/repository/*` talks directly to Prisma.
- `src/utils/*` contains shared helpers for Prisma, JWTs, cookies, responses, and rate limiting.
- `prisma/schema.prisma` defines the domain model for users, salons, services, queues, OTPs, refresh tokens, and pending salons.

## What Is Good

- The app follows a basic layered flow: route → middleware → controller → service → repository → Prisma.
- Input is validated before the controller for OTP login and verification requests.
- The OTP path is isolated into a dedicated provider/service/repository split instead of being embedded directly in the controller.
- Prisma access is centralized through one client wrapper, which is a good base for connection management.
- The rate limiter is specific to OTP traffic, which is a good security control for abuse-prone endpoints.
- The schema already includes the core entities needed for the product: salon, service, queue, OTP verification, refresh token, and pending salon.

## Main Issues

### 1. Auth service is doing too much

`auth.service.ts` currently mixes delivery, verification, token generation, salon creation orchestration, and domain branching. That makes it harder to test and evolve.

What to improve:

- Split OTP orchestration from salon onboarding.
- Move token issuance into a dedicated auth token service.
- Keep verification logic focused on verifying state and returning a clear result.

### 2. Verification flow has correctness and security gaps

The current OTP verification path has several weak points:

- OTP format validation is commented out in middleware.
- `verifyOTP` looks up records using the raw phone value instead of the normalized one in at least one call path.
- `signTokens` is called but its result is ignored, so successful verification does not currently persist or return tokens.
- `verifyToken` accepts a `type` argument but does not use it.
- OTP storage can fall back to plain text in development, which is acceptable only if it is strictly isolated and clearly documented.

### 3. Error handling is too generic

Most controllers and services catch errors and return the same generic failure response. That is fine for the client surface, but it hides root causes from logs and makes debugging harder.

What to improve:

- Log unexpected errors centrally.
- Preserve domain-specific error messages where safe.
- Avoid broad `catch {}` blocks in service logic unless they rethrow structured errors.

### 4. Naming is inconsistent

The codebase uses a mix of `saloon`, `salon`, and a few other naming variants.

That creates friction because it leaks into:

- API contracts
- repository names
- database columns
- validation middleware
- future frontend integration

This is a maintainability issue, not just style.

### 5. Repository methods are thin, but not yet transactional

The verification flow creates a salon from `PendingSalon` after OTP verification. That is a good product flow, but it is not wrapped in a transaction.

Risk:

- OTP can be marked verified while salon creation fails.
- This leaves the system in a partially-completed state.

### 6. Some utilities are present but not fully integrated

There are helpers for JWT cookies and token verification, but the current controller flow does not appear to use them end-to-end.

That suggests the architecture is partially ahead of the implementation.

## Best-Practice Scorecard

Scores are approximate and based on the current backend code only.

- Layering and separation: 7/10
- Prisma/data access organization: 7/10
- Validation and request hygiene: 6/10
- Authentication security: 5/10
- Error handling and observability: 5/10
- Naming consistency: 4/10
- Scalability readiness: 6/10

Overall backend engineering maturity: about 6/10.

## Progress Estimate

If the goal is a solid MVP backend foundation, this looks roughly 60% complete.

Why:

- The core domain and main request flow exist.
- The app is already structured into reasonable layers.
- The remaining work is concentrated in hardening, consistency, and lifecycle management.

The next 40% is mostly production-readiness work rather than greenfield feature work.

## Highest-Value Next Improvements

1. Normalize naming across code, schema, routes, and API payloads.
2. Split auth responsibilities into smaller services.
3. Return and persist tokens properly after OTP verification.
4. Restore strict OTP validation and remove commented-out checks.
5. Wrap multi-step verification/salon creation in a transaction.
6. Replace broad `catch` blocks with structured error handling.
7. Add tests for OTP, registration, and salon creation flows.
8. Add a real health endpoint and operational logging.

## Engineering Notes

- The project is already at a good point for an MVP backend scaffold.
- It is not yet at a production-hardened architecture.
- The biggest risk is not the folder structure; it is the correctness of the auth flow and the consistency of domain behavior.

## Quick Verdict

You have the right high-level structure, but the implementation still needs cleanup before it can be called scalable and production-grade.

The most important work now is tightening the auth/OTP path, removing naming drift, and adding transaction + error-handling discipline.