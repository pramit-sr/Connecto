// Backend configuration
export const BACKEND_URL = "https://connecto-3a69.onrender.com";

// API endpoints
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Environment configuration
export const IS_DEVELOPMENT = import.meta.env.MODE === "development";
export const IS_PRODUCTION = import.meta.env.MODE === "production";

// Development fallback (for local development)
export const LOCAL_BACKEND_URL = "http://localhost:5000";
export const LOCAL_API_BASE_URL = `${LOCAL_BACKEND_URL}/api`;
