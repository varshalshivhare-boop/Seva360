/**
 * Centralized Route Configuration for Seva360 / Darshan360
 * 
 * Changing routes here will automatically update navigation across
 * all pages, layouts, and link references.
 */

export const ROUTES = {
  // Cinematic landing experience
  LANDING: '/',

  // Auth & Portal Entry
  APP_ENTRY: '/app',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',

  // Devotee Experience
  DEVOTEE: {
    ROOT: '/devotee',
    DASHBOARD: '/devotee/dashboard',
    BOOK_DARSHAN: '/devotee/book',
    VIRTUAL_QUEUE: '/devotee/queue',
    TEMPLES: '/devotee/temples',
    SEVAS: '/devotee/sevas',
    PASSES: '/devotee/passes',
  },

  // Authority & Command Center Experience
  AUTHORITY: {
    ROOT: '/authority',
    DASHBOARD: '/authority/dashboard',
    ALERTS: '/authority/alerts',
    ZONES: '/authority/zones',
    STAFF: '/authority/staff',
  },

  // Emergency & SOS
  EMERGENCY: '/emergency',
} as const;

// Backward-compatible export
export const APP_ROUTE = ROUTES.APP_ENTRY;
