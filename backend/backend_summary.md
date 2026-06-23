# WaitLess Backend System & API Documentation

This document provides a comprehensive and highly detailed summary of the WaitLess backend system architecture, database design, and **every single API endpoint** implemented in the application.

---

## 1. Tech Stack & Core Technologies

The WaitLess backend is built using a modern, scalable, and type-safe JavaScript/TypeScript stack:
*   **Runtime:** Node.js (configured with ECMAScript Modules)
*   **Language:** TypeScript (strict type safety for route parameters, payloads, and services)
*   **Framework:** Express.js (RESTful API architecture)
*   **Database ORM:** Prisma (interacting with a MySQL database)
*   **Media Processing:** Multer (memory storage handling), Sharp (image optimization/resizing), and Cloudinary (cloud storage CDN)
*   **Communication & Notifications:** Twilio (SMS & WhatsApp OTP delivery)
*   **Payments:** Razorpay (Order creation & signature verification)
*   **AI Integration:** Google GenAI SDK (utilizing the `gemini-2.5-flash` model for generating salon business insights)
*   **PDF Generation:** Generates and serves dynamic PDFs directly to the client.

---

## 2. Database Models (`schema.prisma`)

1.  **`User`**: Core user accounts representing customers or salon staff. Tracks name, email, phone, role, queues joined, and bookings.
2.  **`Salon`**: Represents registered salon businesses. Stores details like name, owner, address, contact phone, shop image URL, and the current queue token counter (`currentToken`).
3.  **`Service`**: Services offered by specific salons (e.g., haircuts, coloring). Includes name, duration (minutes), and price.
4.  **`Queue`**: Active customers waiting in line. Tracks user ID, salon ID, service ID, token number, status, queue joining timestamp, and estimated start time.
5.  **`Booking`**: Scheduled appointments. Tracks user, salon, service, designated booking time, and status.
6.  **`OtpVerification`**: Manages verification codes sent via SMS/WhatsApp. Holds phone numbers, otp values, expiration, and verification status.
7.  **`RefreshToken`**: Used for secure JWT authentication. Stores hashed tokens, phone numbers, revocation status, and expiration timestamps.
8.  **`PendingSalon`**: Staging table to hold salon details during onboarding. Migrated to the main `Salon` table upon successful OTP verification.

---

## 3. Detailed API Endpoints Documentation

The application enforces a separation of concerns: **Routes ➔ Middlewares ➔ Controllers ➔ Services ➔ Repositories**. All responses (except PDF/binary) follow a standardized JSON format using the `apiResponse` utility:
```json
{
  "statusCode": 200,
  "message": "Success message",
  "success": true,
  "data": { ... }
}
```

### 3.1. Authentication APIs (`/auth`)

#### 1. Send OTP
*   **Endpoint:** `POST /auth/send-otp`
*   **Description:** Generates and sends a 6-digit OTP to the provided phone number via SMS/WhatsApp using Twilio.
*   **Middlewares:** `validateSendOtpRequest`, `otpRateLimiter` (limits to 3 requests per minute).
*   **Request Body:**
    ```json
    {
      "phone": "string (e.g., +1234567890)",
      "method": "string ('sms' or 'whatsapp')"
    }
    ```
*   **Response (200 OK):** Confirmation that OTP was sent.

#### 2. Verify OTP
*   **Endpoint:** `POST /auth/verify-otp`
*   **Description:** Verifies the OTP. If valid, provisions a User, migrates `PendingSalon` (if any) to `Salon`, and issues JWT Access & Refresh tokens as HTTP-only cookies.
*   **Middlewares:** `validateVerifyOtpRequest`
*   **Request Body:**
    ```json
    {
      "phone": "string",
      "method": "string",
      "otp": "string (6-digit)"
    }
    ```
*   **Response (200 OK):**
    *   **Set-Cookie:** `accessToken` (15 mins), `refreshToken` (7 days)
    *   **Body:** Returns user details and indicates successful login/registration.
*   **Error (401):** "Invalid OTP"

#### 3. Register Salon
*   **Endpoint:** `POST /auth/register`
*   **Description:** First step of salon onboarding. Uploads a shop image to Cloudinary and saves details in a staging `PendingSalon` table.
*   **Middlewares:** `upload.single("imageUrl")`, `RegisterSaloonRequest`, `uploadToCloudinary`
*   **Content-Type:** `multipart/form-data`
*   **Form Data:**
    *   `name`: string (Owner name)
    *   `saloon_name`: string
    *   `address`: string
    *   `phone`: string
    *   `imageUrl`: File (Image processed via Sharp & uploaded to Cloudinary)
*   **Response (200 OK):** Salon details staged successfully.

#### 4. Refresh Token
*   **Endpoint:** `POST /auth/refresh`
*   **Description:** Rotates the refresh token. Invalidates the old token and issues a new pair of Access and Refresh cookies.
*   **Cookies Required:** `refreshToken`
*   **Response (200 OK):**
    *   **Set-Cookie:** New `accessToken`, New `refreshToken`
    *   **Body:** `{ "accessToken": "..." }`
*   **Error (401):** "No refresh token"

---

### 3.2. Salon APIs (`/salon`)

#### 5. List All Salons
*   **Endpoint:** `GET /salon/salons`
*   **Description:** Fetches a paginated list of all registered salons. Supports fuzzy search.
*   **Auth Required:** Yes (`validateToken`)
*   **Query Parameters:**
    *   `pageNumber` (optional, default: 1)
    *   `pageSize` (optional, default: 5)
    *   `search` (optional, string)
*   **Response (200 OK):** Paginated list of salons.

#### 6. Get Salon Details
*   **Endpoint:** `GET /salon/salon/:id`
*   **Description:** Retrieves full details of a specific salon by its ID.
*   **Auth Required:** Yes (`validateToken`)
*   **Path Parameters:** `id` (numeric Salon ID)
*   **Response (200 OK):** Detailed salon object including relation data.

---

### 3.3. Service APIs (`/service`)

#### 7. Get All Services for a Salon
*   **Endpoint:** `GET /service/salon/:salonId/services`
*   **Description:** Fetches all services offered by a specific salon with pagination.
*   **Path Parameters:** `salonId`
*   **Query Parameters:** `pageNumber` (default: 1), `pageSize` (default: 10)
*   **Response (200 OK):** Paginated list of services.

#### 8. Add a New Service
*   **Endpoint:** `POST /service/salon/:salonId/services`
*   **Description:** Adds a new service to the specified salon's catalog.
*   **Path Parameters:** `salonId`
*   **Request Body:**
    ```json
    {
      "name": "string",
      "duration": "number (in minutes)",
      "price": "number"
    }
    ```
*   **Response (201 Created):** The newly created service object.

#### 9. Update a Service
*   **Endpoint:** `PATCH /service/salon/:salonId/services/:serviceId`
*   **Description:** Partially updates an existing service.
*   **Path Parameters:** `salonId`, `serviceId`
*   **Request Body:**
    ```json
    {
      "name": "string (optional)",
      "duration": "number (optional)",
      "price": "number (optional)"
    }
    ```
*   **Response (200 OK):** The updated service object.

---

### 3.4. Queue System APIs (`/queue`)

#### 10. Book a Slot (Join Queue)
*   **Endpoint:** `POST /queue/salon/:salonId/book-slot`
*   **Description:** Joins the active queue for a specific service at a salon. Increments the token counter.
*   **Auth Required:** Yes (`validateToken` - User ID extracted from token)
*   **Path Parameters:** `salonId`
*   **Request Body:**
    ```json
    {
      "serviceId": "number"
    }
    ```
*   **Response (200 OK):** Returns the generated queue token number and estimated wait time.

#### 11. List Queue Bookings
*   **Endpoint:** `GET /queue/salon/:salonId/book-list`
*   **Description:** Retrieves a paginated list of current bookings/tokens for the salon.
*   **Auth Required:** Yes (`validateToken`)
*   **Path Parameters:** `salonId`
*   **Query Parameters:**
    *   `pageNumber` (default: 1)
    *   `pageSize` (default: 5)
    *   `serviceId` (optional, to filter queue by a specific service)
*   **Response (200 OK):** Paginated list of active queue items.

---

### 3.5. Analytics & AI APIs (`/analytics`, `/ai`)

#### 12. Get Today's Analytics
*   **Endpoint:** `GET /analytics/today/:salonId`
*   **Description:** Calculates and returns real-time metrics for the day including Customers Served, Total Revenue, Top Service, and Peak Hours.
*   **Auth Required:** Yes (`validateToken`)
*   **Path Parameters:** `salonId`
*   **Response (200 OK):** Aggregated metrics object.

#### 13. Get AI Business Insights
*   **Endpoint:** `GET /ai/insights/:salonId`
*   **Description:** Fetches today's analytics and feeds them into **Gemini 2.5 Flash** to generate business insights, recommendations, and growth opportunities.
*   **Path Parameters:** `salonId`
*   **Response (200 OK):**
    ```json
    {
      "summary": "AI generated overview...",
      "recommendation": "Actionable advice...",
      "growthOpportunity": "Suggestions for revenue..."
    }
    ```

---

### 3.6. Payment APIs (`/payment`)

#### 14. Create Payment Order
*   **Endpoint:** `POST /payment/create-order`
*   **Description:** Interfaces with Razorpay (or another provider) to generate a new order ID for a transaction.
*   **Auth Required:** Yes (`validateToken` - User ID extracted from token)
*   **Request Body:**
    ```json
    {
      "amount": "number (in minimal currency unit, e.g., paise/cents)"
    }
    ```
*   **Response (200 OK):** Order details including the generated `order_id`.

#### 15. Verify Payment
*   **Endpoint:** `POST /payment/verify-payment`
*   **Description:** Verifies the cryptographic signature returned by the payment gateway to confirm a successful transaction.
*   **Request Body:**
    ```json
    {
      "razorpay_payment_id": "string",
      "razorpay_order_id": "string",
      "razorpay_signature": "string"
    }
    ```
*   **Response (200 OK):** Confirmation of successful payment verification.

---

### 3.7. PDF Generation APIs (`/pdf-generation`)

#### 16. Generate PDF
*   **Endpoint:** `GET /pdf-generation/generate`
*   **Description:** Generates a dynamic PDF document (like a prescription, receipt, or token slip) on the server.
*   **Headers Returned:**
    *   `Content-Type: application/pdf`
    *   `Content-Disposition: inline; filename=prescription.pdf`
*   **Response (200 OK):** Raw binary stream of the generated PDF file.
