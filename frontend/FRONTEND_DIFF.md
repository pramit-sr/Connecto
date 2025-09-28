# Frontend Backend URL Configuration Changes

This diff file shows the changes made to update the frontend to use the new backend URL `https://connecto-3a69.onrender.com`.

## Files Changed

### 1. New File: `src/constants/config.js`

```javascript
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
```

### 2. Modified File: `src/lib/axios.js`

**Before:**
```javascript
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
});
```

**After:**
```javascript
import axios from "axios";
import { API_BASE_URL, LOCAL_API_BASE_URL, IS_DEVELOPMENT } from "../constants/config.js";

export const axiosInstance = axios.create({
  baseURL: IS_DEVELOPMENT ? LOCAL_API_BASE_URL : API_BASE_URL,
  withCredentials: true,
});
```

## Summary of Changes

1. **Created new config file**: `src/constants/config.js` to centralize backend URL configuration
2. **Updated axios configuration**: Now imports from config file instead of using hardcoded URLs
3. **Environment-aware routing**: 
   - Development: Uses `http://localhost:5000/api`
   - Production: Uses `https://connecto-3a69.onrender.com/api`
4. **Centralized configuration**: All backend URLs are now stored in one place for easy maintenance

## Benefits

- **Easy URL updates**: Change backend URL in one place
- **Environment separation**: Clear distinction between dev and production
- **Maintainability**: Centralized configuration management
- **Flexibility**: Easy to add more environment-specific configurations

## Usage

The frontend will now automatically use:
- `http://localhost:5000/api` when running in development mode
- `https://connecto-3a69.onrender.com/api` when running in production mode

No other code changes are required - all API calls will automatically use the correct backend URL.
