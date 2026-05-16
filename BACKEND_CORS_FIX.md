# Backend CORS Fix for RoadmapX Mobile App

The RoadmapX Capacitor Android app needs the backend to accept requests from the following origins. Without these CORS changes, the mobile app will fail to communicate with the API.

---

## Origins Required

| Origin                                      | Purpose                                          |
|---------------------------------------------|--------------------------------------------------|
| `https://roadmapx-frontend.pages.dev`       | Cloudflare Pages web app                         |
| `capacitor://localhost`                      | Capacitor iOS app default origin                 |
| `http://localhost`                           | Capacitor Android app (when using http scheme)   |
| `capacitor://com.roadmapx.app`              | Capacitor app with custom scheme & appId         |

---

## Changes Required in `server.js`

Open the backend `server.js` file and update the CORS configuration as follows:

### Find the existing CORS setup

Look for something like:

```js
const cors = require('cors');

app.use(cors({
  origin: 'https://roadmapx-frontend.pages.dev',
  credentials: true
}));
```

### Replace with the updated configuration

```js
const cors = require('cors');

app.use(cors({
  origin: [
    'https://roadmapx-frontend.pages.dev',
    'capacitor://localhost',
    'http://localhost',
    'capacitor://com.roadmapx.app'
  ],
  credentials: true
}));
```

### If using a custom CORS middleware instead of the `cors` package

Replace any manual CORS header logic with:

```js
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://roadmapx-frontend.pages.dev',
    'capacitor://localhost',
    'http://localhost',
    'capacitor://com.roadmapx.app'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
```

---

## Cookie Configuration

If the backend sets cookies (e.g., for authentication sessions), ensure the cookie options include:

```js
res.cookie('token', token, {
  httpOnly: true,
  secure: true,        // Required for cross-origin cookies
  sameSite: 'none',    // Required for cross-origin cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
  path: '/'
});
```

### Key cookie settings explained:

| Setting      | Value    | Why                                                                  |
|--------------|----------|----------------------------------------------------------------------|
| `secure`     | `true`   | Required when `sameSite: 'none'`. Ensures cookies are only sent over HTTPS. The Capacitor app uses `https` scheme by default. |
| `sameSite`   | `'none'` | Allows cookies to be sent in cross-origin requests. Without this, the mobile app cannot receive or send auth cookies. |
| `credentials`| `true`   | On the CORS middleware side, this tells the browser to include cookies in cross-origin requests. Must be set on BOTH the server (CORS config) and client (`fetch` with `credentials: 'include'`). |

---

## If Using Express Session

If you're using `express-session`, update the session config:

```js
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  }
}));
```

---

## Frontend Fetch Calls

Ensure all `fetch()` calls from the frontend include credentials:

```js
// With fetch
fetch('https://your-backend-url/api/endpoint', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

// With axios
axios.get('https://your-backend-url/api/endpoint', {
  withCredentials: true
});
```

---

## Testing the CORS Fix

### 1. Test from the web app

Open `https://roadmapx-frontend.pages.dev` in your browser and verify login/API calls work.

### 2. Test from the Android app

```bash
# Build and install the debug APK
cd android && ./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk

# Watch logs for CORS errors
adb logcat | grep -i "cors\|access-control\|capacitor"
```

### 3. Verify CORS headers with curl

```bash
# Test preflight request
curl -X OPTIONS \
  -H "Origin: capacitor://com.roadmapx.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \
  -i \
  https://your-backend-url/api/login

# Should return:
# Access-Control-Allow-Origin: capacitor://com.roadmapx.app
# Access-Control-Allow-Credentials: true
# Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
# Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

### 4. Common issues

| Symptom                              | Cause                                          | Fix                                                    |
|--------------------------------------|------------------------------------------------|--------------------------------------------------------|
| 401 Unauthorized on mobile           | Cookies not being sent                         | Ensure `credentials: 'include'` on frontend + `credentials: true` + `sameSite: 'none'` + `secure: true` on backend |
| CORS error in console                | Origin not in allowed list                     | Add the exact origin string to the allowed origins array |
| Preflight (OPTIONS) returns 405      | No OPTIONS handler                             | Add `app.options('*', cors())` or handle OPTIONS in middleware |
| Cookies set but not sent back        | `sameSite` is `Lax` or `Strict`               | Change to `sameSite: 'none'` and `secure: true`        |
| Mixed content warning                | App is HTTPS but backend is HTTP               | Backend must be served over HTTPS (Render provides this) |

---

## Summary Checklist

- [ ] Add `capacitor://localhost` to CORS allowed origins
- [ ] Add `http://localhost` to CORS allowed origins
- [ ] Add `capacitor://com.roadmapx.app` to CORS allowed origins
- [ ] Keep `https://roadmapx-frontend.pages.dev` in CORS allowed origins
- [ ] Set `credentials: true` in CORS middleware config
- [ ] Set `sameSite: 'none'` on all cookies
- [ ] Set `secure: true` on all cookies
- [ ] Ensure frontend fetch calls use `credentials: 'include'`
- [ ] Test login flow from both web and mobile
- [ ] Redeploy backend after changes
