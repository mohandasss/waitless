# WaitLess Backend Development Summary

This document provides a comprehensive summary of the WaitLess backend system architecture, database design, and key features implemented to date.

---

## 1. Tech Stack & Core Technologies

The WaitLess backend is built using a modern, scalable, and type-safe JavaScript/TypeScript stack:
*   **Runtime:** Node.js (configured with ECMAScript Modules)
*   **Language:** TypeScript (strict type safety for route parameters, payloads, and services)
*   **Framework:** Express.js (RESTful API architecture)
*   **Database ORM:** Prisma (interacting with a MySQL database)
*   **Media Processing:** Multer (memory storage handling), Sharp (image optimization/resizing), and Cloudinary (cloud storage CDN)
*   **Communication & Notifications:** Twilio (SMS & WhatsApp OTP delivery)
*   **AI Integration:** Google GenAI SDK (utilizing the `gemini-2.5-flash` model for generating salon business insights)

---

## 2. Database Models (`schema.prisma`)

The system utilizes Prisma for schema migrations and query building. The relational database schema defines the following models:

1.  **`User`**: Core user accounts representing customers or salon staff. Linked to a `Salon` if they are associated with a business. Tracks name, email, phone, hashed password, role, queues joined, and bookings made.
2.  **`Salon`**: Represents registered salon businesses. Stores details like name, owner, address, contact phone, shop image URL, current open/close status (`isOpen`), and the current queue token counter (`currentToken`).
3.  **`Service`**: Services offered by specific salons (e.g., haircuts, coloring). Includes name, duration (minutes), price, and a relation back to the salon.
4.  **`Queue`**: Represents current active customers waiting in line. Tracks user ID, salon ID, service ID, token number, status (e.g., "Booked"), queue joining timestamp, and estimated start time.
5.  **`Booking`**: Represents scheduled appointments. Tracks user, salon, service, designated booking time, status, and creation date.
6.  **`OtpVerification`**: Manages verification codes sent via SMS/WhatsApp. Holds phone numbers, otp values, expiration timestamps, and verification status.
7.  **`RefreshToken`**: Used for secure JWT authentication. Stores hashed tokens, phone numbers, revocation status, and expiration timestamps to support refresh token rotation.
8.  **`PendingSalon`**: A staging table used to hold salon details during the onboarding registration flow. Details are only migrated to the main `Salon` table once the owner successfully verifies their phone number via OTP.

---

## 3. Directory & File Structure

The backend workspace is structured cleanly according to the layered architectural pattern (**Routes ➔ Middlewares ➔ Controllers ➔ Services ➔ Repositories ➔ Database**):

```text
backend/
├── prisma/
│   ├── schema.prisma                  # Prisma relational schema definition
│   └── migrations/                    # SQL schema history files
├── src/
│   ├── app.ts                         # Express app configuration & middleware routing
│   ├── server.ts                      # Server initialization & graceful shutdown handlers
│   ├── config/
│   │   └── googleClient.ts            # Gemini AI model initialization helper
│   ├── controllers/                   # HTTP Request/Response handlers
│   │   ├── Ai/
│   │   │   └── getAiInsights.controller.ts
│   │   ├── analytics/
│   │   │   └── analytics.controller.ts
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   └── salon.controller.ts
│   │   ├── queue/
│   │   │   └── queue.controller.ts
│   │   └── services/
│   │       └── services.controller.ts
│   ├── middlewares/                   # Request validators and auth checkpoint middlewares
│   │   └── auth.middleware.ts
│   ├── provider/
│   │   └── OtpProvider.ts             # Twilio SMS & WhatsApp message sender
│   ├── repository/                    # Database access abstraction layers (Prisma queries)
│   │   ├── otpRepository.ts
│   │   ├── pendingSalonRepository.ts
│   │   ├── queue.Repository.ts
│   │   ├── refreshTokenRepository.ts
│   │   ├── salon.repository.ts
│   │   └── services.repository.ts
│   ├── routes/                        # Express routers mapping endpoints to controllers
│   │   ├── ai.routes.ts
│   │   ├── analytics.routes.ts
│   │   ├── auth.routes.ts
│   │   ├── queue.routes.ts
│   │   ├── salon.routes.ts
│   │   └── service.routes.ts
│   ├── services/                      # Business logic layer (computations, API calls)
│   │   ├── AiInsights.service.ts
│   │   ├── auth.service.ts
│   │   ├── otp.service.ts
│   │   ├── queue.service.ts
│   │   ├── salon.service.ts
│   │   └── services.service.ts
│   ├── types/
│   │   └── express.d.ts               # Custom Express type declarations (e.g., req.user)
│   └── utils/                         # Global helper scripts & configurations
│       ├── ApiError.ts                # Custom API Error class
│       ├── apiResponse.ts             # Unified JSON response formatter
│       ├── cookies.ts                 # Access/Refresh cookie management
│       ├── getPagination.ts           # Offset pagination helper
│       ├── globalErrorHandler.ts      # Global Express error interceptor
│       ├── imageUploadUtil.ts         # Multer, Sharp resize, and Cloudinary upload utility
│       ├── jwt.ts                     # JWT generation/verification (Access & Refresh tokens)
│       ├── miscHelpers.ts             # String formatters and hash generators
│       ├── pagination.ts              # Unified paginated response builder
│       ├── prisma.ts                  # Shared Prisma client instance
│       └── ratelimiter.ts             # OTP Rate-limiting middleware
```

---

## 4. Key Endpoints & Architectural Flow

The application enforces a separation of concerns where routes define endpoints, middlewares validate input/tokens, controllers process requests, services execute business logic, and repositories access the database.

### 4.1. Authentication (`/auth`)
*   **Salon Registration (`POST /auth/register`)**:
    *   **Middleware (`RegisterSaloonRequest`)**: Validates registration parameters.
    *   **Image Processing (`upload.single("imageUrl")` & `uploadToCloudinary`)**: Intercepts the uploaded image, utilizes **Sharp** to resize/compress the image to an optimized JPEG format (800x600 px at 80% quality), and uploads it to **Cloudinary**.
    *   **Service & DB**: Generates and sends a verification OTP to the owner's phone. Stashes the salon data temporarily inside the `PendingSalon` table.
*   **Send OTP (`POST /auth/send-otp`)**:
    *   **Rate-limiting (`otpRateLimiter`)**: Blocks requests if more than 3 OTPs are requested in under a minute per IP/Phone.
    *   **Service & DB**: Generates a 6-digit OTP (hardcoded to `123456` in development mode, or dynamic via Twilio in production), hashes it, and stores it in the `OtpVerification` table. Sends the message via Twilio (SMS or WhatsApp).
*   **Verify OTP (`POST /auth/verify-otp`)**:
    *   **Service & DB**: Checks OTP validity and expiration. If valid, updates the verification status. If a corresponding `PendingSalon` exists, creates the active `Salon` record. Automatically creates a `User` profile if one does not exist for the phone number.
    *   **JWT & Cookies**: Generates an **Access Token** (expires in 15 minutes) and a **Refresh Token** (expires in 7 days). Sets both inside secure HTTP-Only, SameSite cookies.
*   **Refresh Token Rotation (`POST /auth/refresh`)**:
    *   **Service**: Implements refresh token rotation. Validates the incoming refresh token from cookies, revokes the old record in the database, and issues a brand-new set of cookies to prevent replay attacks.

### 4.2. Salon & Service Management (`/salon` & `/service`)
*   **List Salons (`GET /salon/salons`)**:
    *   Retrieves all registered salons. Supports cursor-like offset pagination (page number, page size) and fuzzy text searching by name.
*   **Salon Details (`GET /salon/salon/:id`)**:
    *   Retrieves full details of a specific salon, eager-loading its list of offered services.
*   **Manage Services (`GET`, `POST`, `PATCH` `/service/salon/:salonId/services`)**:
    *   Allows fetching services (with pagination), adding a new service (verifying uniqueness of the name to prevent duplicates within a salon), and updating existing services.

### 4.3. Queue System (`/queue`)
*   **Book Slot (`POST /queue/salon/:salonId/book-slot`)**:
    *   Creates a new active queue record for a user and service.
    *   **Repository**: Aggregates existing tokens for the given salon and service, increments the maximum token number, and saves the new queue record with status `Booked`.
*   **List Queue / Bookings (`GET /queue/salon/:salonId/book-list`)**:
    *   Retrieves a paginated list of bookings/tokens for the salon. Supports filters by `serviceId` and `userId` to allow customers to check their positions or salons to view their workload.

### 4.4. Analytics & AI Insights (`/analytics` & `/ai`)
*   **Daily Analytics (`GET /analytics/today/:salonId`)**:
    *   Calculates real-time metrics for the day:
        *   **Customers Served**: Count of completed/booked tokens.
        *   **Total Revenue**: Aggregated sum of prices from services completed.
        *   **Top Service**: Groups queue bookings by service ID to find the most popular service.
        *   **Peak Hours**: Groups queue join timestamps by hour to determine peak operational times.
*   **AI Business Insights (`GET /ai/insights/:salonId`)**:
    *   **Service**: Fetches the computed today's analytics and embeds them in a detailed prompt.
    *   **Gemini Model**: Integrates **Gemini 2.5 Flash** using system rules (requiring clean JSON output, restricting hallucination, and requesting a concise summary, operational recommendations, and a growth opportunity).
    *   **Output Schema**: Returns a parsed JSON structure directly to the client:
        ```json
        {
          "summary": "General performance overview...",
          "recommendation": "Operational recommendations based on peak hours and workload...",
          "growthOpportunity": "Actionable suggestions to drive revenue..."
        }
        ```

---

## 5. Security and Error-Handling Standards

*   **Cookie-based Authentication**: Access and refresh tokens are stored in `HttpOnly` and `SameSite: Lax` cookies, protecting them against XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery) attacks.
*   **Global Error Handler**: Express router errors and database exceptions are intercepted by a centralized error middleware, shielding internal stack traces from clients and returning standardized error JSON payloads using the custom `ApiError` class.
*   **Rate Limiting**: Critical authentication entry points (like OTP request) are guarded by `express-rate-limit` using the client phone number/IP address.
*   **Database Constraints**: Ensures database integrity using unique indexes (e.g., unique phone numbers for salons/users) and handles constraint violations gracefully.
