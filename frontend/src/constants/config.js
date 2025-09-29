// Backend configuration - Render backend URL
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://connecto-rdkk.onrender.com";

// API endpoints
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Environment configuration
export const IS_DEVELOPMENT = import.meta.env.MODE === "development";
export const IS_PRODUCTION = import.meta.env.MODE === "production";

// Optional: force using remote API during local development
export const USE_REMOTE_API = import.meta.env.VITE_USE_REMOTE_API === "true";

// Development fallback (for local development)
export const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL || "http://localhost:5000";
export const LOCAL_API_BASE_URL = `${LOCAL_BACKEND_URL}/api`;
