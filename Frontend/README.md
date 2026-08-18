# Seva360 — Smart Temple & Pilgrimage Management Platform

Welcome to **Seva360** (also known as *Darshan360*), an intelligent pilgrimage crowd-management and devotee safety platform designed for major Indian temples (Somnath, Dwarka, Ambaji, Pavagadh, Kashi Vishwanath, etc.).

This repository contains the complete frontend architecture:
1. **Preserved Cinematic Scroll Landing Page**: 480-frame scroll-driven canvas journey into the temple sanctum.
2. **Modular Production React Application**: Converted from Google Stitch UI screens into a typed React Router application with isolated mock data, role-based layouts, and API-ready service layers.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🗺️ Route Directory

| Route | Page / View | Layout | Description |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` | Fullscreen | Cinematic scroll-driven temple journey & full Darshan hold. |
| `/app` or `/login` | `AuthPortalPage` | Portal | Secure login, role selector (Devotee vs Authority), feature pillars. |
| `/signup` | `SignUpPage` | Minimal | Pilgrim registration with Government ID verification. |
| `/forgot-password` | `ForgotPasswordPage` | Minimal | SMS / Email OTP recovery flow. |
| `/devotee/dashboard` | `DevoteeDashboardPage` | `DevoteeLayout` | Active queue pass, weather, prayer timings, quick actions. |
| `/devotee/book` | `BookDarshanPage` | `DevoteeLayout` | Temple picker, date calendar, time slot grid, devotee forms, pricing. |
| `/devotee/queue` | `VirtualQueuePage` | `DevoteeLayout` | Real-time queue tracker, checkpoint step progress, QR E-Pass. |
| `/devotee/temples` | `TemplesDirectoryPage` | `DevoteeLayout` | Temple directory with live crowd meters, search, and state filters. |
| `/authority/dashboard` | `CommandCenterPage` | `AuthorityLayout` | Real-time CCTV/Drone AI feeds, zone heatmaps, incident dispatch, staff status. |
| `/emergency` | `EmergencyHelpPage` | `DevoteeLayout` | 1-Tap SOS broadcast, incident reporting, direct call helplines (112, 108). |

---

## 🏗️ Architecture & Folder Structure

```text
src/
├── config/
│   └── routes.ts              # Centralized route constants (ROUTES)
├── context/
│   └── AuthContext.tsx        # Role-based auth provider (Devotee / Authority / Police / Medical)
├── data/                      # Isolated mock data layer (ready to swap with APIs)
│   ├── mockTemples.ts         # Temple details, sevas, live crowd percentages
│   ├── mockQueue.ts           # Token numbers, estimated wait, route checkpoints
│   ├── mockBookings.ts        # Upcoming darshan passes and devotee members
│   ├── mockAlerts.ts          # Real-time incident alerts and safety warnings
│   ├── mockAuthority.ts       # Zone density statistics, CCTV info, staff roster
│   └── mockUser.ts            # Devotee and Authority user profiles
├── services/                  # API-ready service contracts for backend handoff
│   ├── authService.ts         # login, signup, logout, requestPasswordReset
│   ├── bookingService.ts      # getBookings, getBookingById, createBooking
│   ├── queueService.ts        # getLiveQueueStatus, joinVirtualQueue
│   ├── templeService.ts       # getTemples, getTempleById, searchTemples
│   ├── alertService.ts        # getAlerts, triggerEmergencySos, resolveAlert
│   └── authorityService.ts    # getDashboardMetrics, getZoneAnalytics, dispatchStaff
├── layouts/                   # Reusable page shells
│   ├── DevoteeLayout.tsx      # Pilgrim navbar, mobile drawer, SOS button, profile dropdown, footer
│   └── AuthorityLayout.tsx    # Command header, real-time clock, department badge, CCTV status
├── components/
│   ├── common/                # Shared UI building blocks (StatusPill, PriorityBadge, Modal, FeedbackStates, MaterialIcon)
│   ├── devotee/               # QueueProgressCard, QREPassCard, TempleCard, BookingSlotPicker
│   ├── authority/             # KpiMetricCard, ZoneHeatmap, AlertFeedItem
│   └── emergency/             # SosPanicButton, IncidentReportForm
├── pages/                     # Routed view components
└── styles/
    ├── index.css              # Cinematic landing page styles & canvas viewport
    └── heritage-modernist.css # Heritage Modernist design system tokens (Deep Maroon, Warm Ivory)
```

---

## 🔌 Backend Integration Points (For Backend Engineers)

The frontend is architected so that **zero UI code needs to be modified** when connecting backend services. Simply update the files in `src/services/`:

1. **Authentication (`src/services/authService.ts`)**:
   - Replace mock resolvers with your Firebase Auth / Supabase / Express JWT endpoint.
   - Attach JWT bearer token to `localStorage` or `httpOnly` cookies.
2. **Booking Engine (`src/services/bookingService.ts`)**:
   - Connect `createBooking()` to your Node.js / Django slot reservation API.
   - Connect payment gateway webhook / order ID.
3. **Virtual Queue & Dynamic Wait Calculation (`src/services/queueService.ts`)**:
   - Connect WebSocket or polling endpoint to stream real-time queue position and ML-calculated wait time.
4. **Emergency SOS & Push Dispatch (`src/services/alertService.ts`)**:
   - Connect `triggerEmergencySos()` to Firebase Cloud Messaging (FCM) and Twilio SMS gateway for police and ambulance dispatch.
5. **Authority CCTV & AI Vision (`src/services/authorityService.ts`)**:
   - Connect RTSP / WebRTC stream URL to the video player in `CommandCenterPage.tsx` for real-time YOLOv8 + DeepSORT crowd bounding boxes.

---

## 🎨 Design System

- **Palette**: Deep Maroon (`#570000`), Saffron (`#8f4e00`), Warm Ivory (`#fcf9f2`), Subtle Gold (`#e5c378`), Deep Sacred Shadows (`#070709`).
- **Typography**: `Montserrat` (Headlines & KPIs), `Inter` (Body & UI), `Cinzel` (Cinematic Titles).
- **Icons**: Google Material Symbols Outlined + Lucide Icons.
