# WaitLess — Salon Queue Management MVP

## Overview
WaitLess is a mobile-first full-stack salon queue and booking system designed to solve local salon waiting chaos, customer uncertainty, and walkout loss.

It helps customers:
- View live salon queue
- Check estimated wait times
- Join queue remotely
- Track token status live

It helps salon owners:
- Manage walk-ins
- Add online customers
- Move queue forward
- Track live customer flow

---

# Core Problem Solved
Traditional local salons often manage queues manually:
- “Come after 1 hour”
- Unclear waiting
- Customer frustration
- Lost business

WaitLess digitizes this into a real-time queue system.

---

# MVP Features

## Customer:
- Live queue visibility
- Join queue
- Token number
- ETA tracking
- Queue status updates

## Salon:
- Login
- Dashboard
- Add walk-in
- Next customer
- Skip customer
- Queue management

---

# Tech Stack

## Frontend:
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand

## Backend:
- Node.js
- Express.js
- Prisma ORM
- MySQL
- Socket.io
- JWT Auth

---

# Project Structure
```txt
frontend/   -> Customer + Salon UI
backend/    -> APIs + DB + Auth + Queue Engine
