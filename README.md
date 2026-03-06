# Universal Error Handler 🚀
[![npm version](https://badge.fury.io/js/universal-error-handler.svg)](https://badge.fury.io/js/universal-error-handler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The ultimate, highly extensible, and professional error-handling library for all JavaScript and TypeScript applications (Node.js, Express, Fastify, React, Vue, APIs, and beyond).

Write cleaner code. Catch everything cleanly. Provide highly standardized, enterprise-grade REST API responses.

## Key Features ✨

- **🌐 Universal Applicability:** Specifically designed middleware for `Express` and `Fastify`, plus raw Node integrations.
- **💻 Frontend Ready:** Use it in React, Vue, or Next.js to parse and format incoming HTTP / API fallback errors!
- **🛠 Zero-Config Middlewares:** Plug-and-play middleware formats your exceptions into a standardized JSON response format.
- **🛡 Native Validation & ORM Parsing:** Automatically normalizes complex errors from `MongoDB/Mongoose`, `Prisma`, `Sequelize`, `Zod`, and `express-validator`.
- **🕸 Axios / Network Support:** Automatically standardizes third-party `Axios` API errors!
- **⚡ Async Handler Wrappers:** Out-of-the-box `asyncHandler` wrapper for eliminating `try...catch` boilerplate in Express.
- **📜 150+ Standardized Error Messages:** Out of the box pre-defined business logic, HTTP, security, and internal error profiles.
- **📝 TypeScript Types:** First-class TypeScript support (`index.d.ts` included).
- **💥 Process Crash Handlers:** Handle `unhandledRejection` and `uncaughtException` as professional production apps do.

---

## 👨‍💻 Developer

**Mandeep Yadav**  
*Building professional tools for the JavaScript ecosystem.*

---

## 🏆 Enterprise Level Features (New in v1.1.0)

- **🌍 Internationalization (i18n):** Out of the box support for translating error constants into Hindi (`hi`), Spanish (`es`), French (`fr`), and English (`en`).
- **🛡️ Sensitive Data Masking:** Automatically redacts `password`, `creditCard`, `token`, `authorization`, etc. in error details before sending to the client or logging to the server.
- **🛰️ Webhooks / Alerting:** Automatically POSTs critical `500 Internal Server Errors` directly to Sentry, Discord, Slack, or Datadog without heavy integrations.
- **⚙️ Deep Configuration Engine:** Customize JSON formatter shapes, turn off paths, inject custom dictionaries seamlessly.

---

## 📦 Installation

```bash
npm install universal-error-handler
```
---

## ⚙️ Global Configuration & Enterprise Setup

Want to customize how the handler looks, or add your own team's custom error constants?
You can setup global configurations in your main entry file (e.g. `index.js` or `app.js`).

```javascript
const { configure } = require('universal-error-handler');

configure({
  // Basic payload shape options
  includeTimestamp: true,  // Adds ISO timestamp to response (Default: true)
  includePath: true,       // Adds req.path to response (Default: true)
  
  // 🌍 Internationalization (Translate standard error messages)
  language: 'hi', // 'en' (English), 'hi' (Hindi), 'es' (Spanish), 'fr' (French)
  
  // 🛡️ Data Redaction (Protect sensitive info from leaking in error details)
  maskSensitiveData: true, 
  maskFields: ['password', 'creditCard', 'token', 'authorization'], // Define your own keys!

  // 🛰️ Webhook Alerting (Send 500 fatal errors directly to Sentry / Slack / Datadog)
  webhookUrl: 'https://hooks.slack.com/services/T0000/B0000/XXXX',
  webhookHeaders: { 'Authorization': 'Bearer my-token' },
  onWebhookError: (err) => console.log('Alert ping failed', err.message),
  
  // Custom Dictionary: Need to inject your own custom constants?
  customDictionary: [
    { code: 'SUBSCRIPTION_PAUSED', message: 'Your subscription is paused.', statusCode: 402 },
    { code: 'BANNED_IP', message: 'This IP address is banned.', statusCode: 403 }
  ],
  
  // Default JSON Formatter Overwrite (If you strictly prefer `{ success: false }`)
  defaultFormatter: (error, req) => {
    return {
      success: false,
      problem: error.message,
      extra: error.details, // This value is automatically masked by the Engine!
      happenedAt: new Date().toISOString()
    };
  }
});
```

---

## ⚡ Setup & Examples by Platform

Copy-paste these snippets to get started across any framework or runtime environment.

### 1. 🟢 Express.js (Node.js Backend)

No more endless `try...catch` blocks. Just wrap async functions in `asyncHandler` and define `expressErrorMiddleware` at the end of your routes.

```javascript
const express = require('express');
const { 
  expressErrorMiddleware, 
  asyncHandler, 
  NotFoundError, 
  BadRequestError 
} = require('universal-error-handler');

const app = express();
app.use(express.json());

// Example Route with asyncHandler (Zero try...catch needed!)
app.get('/api/users/:id', asyncHandler(async (req, res, next) => {
  const user = await Database.findUser(req.params.id); 

  if (!user) {
    // Throw standard error types easily!
    throw new NotFoundError('User could not be found in our database');
  }

  res.status(200).json({ status: 'success', data: user });
}));

// Route catching a bad request natively
app.post('/api/users', asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new BadRequestError('Email address is strictly required!');
  }
}));

// Use as the very last middleware
app.use(expressErrorMiddleware);

app.listen(3000, () => console.log('Server is running on port 3000'));
```

When an error happens, your client gets a beautifully standardized JSON response:
```json
{
  "status": "fail",
  "message": "User could not be found in our database",
  "errorCode": "NOT_FOUND",
  "timestamp": "2026-03-06T15:20:00.000Z",
  "path": "/api/users/123"
}
```

### 2. 🦊 Fastify

Fastify handles async natively, so you just need the Error Handler! It automatically resolves and prints formatted JSON.

```javascript
const fastify = require('fastify')({ logger: true });
const { fastifyErrorMiddleware, BadRequestError } = require('universal-error-handler');

// Set Global Error Handler
fastify.setErrorHandler(fastifyErrorMiddleware);

fastify.get('/', async (request, reply) => {
  // Throws a beautifully caught custom error
  throw new BadRequestError('Oops! Invalid configuration.', 'INVALID_CONFIG');
});

fastify.listen({ port: 3000 });
```

### 3. ⚛️ React / Frontend Applications

You can use the Universal Error Handler in your frontend to predictably process API failures (like Axios network timeouts, 500s or 400 validation issues) and show user-friendly messages using the `parseError` utility!

```javascript
import { parseError } from 'universal-error-handler';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Just an example UI library

const fetchDashboard = async () => {
  try {
    const response = await axios.get('/api/dashboard');
    return response.data;
  } catch (error) {
    // ParseError formats API Axios responses, Javascript TypeErrors, or basic payloads
    const formattedError = parseError(error);
    
    // Shows standard frontend message: "Network unavailable", "Not authorized", or custom message!
    toast.error(formattedError.message); 

    // Feel free to read standard codes sent by your backend!
    if (formattedError.errorCode === 'TOKEN_EXPIRED') {
      logoutUser();
    }
  }
}
```

### 4. 🦕 TypeScript (Any Environment)

Types are completely built-in! You don't need `@types/universal-error-handler`. All types infer effortlessly.

```typescript
import { AppError, ConflictError, parseError } from 'universal-error-handler';

// Custom Typed Error throwing
function validateEmail(email: string): void | never {
  if (email === 'taken@example.com') {
    throw new ConflictError('Email already registered', 'EMAIL_TAKEN', { email });
  }
}

try {
  validateEmail('taken@example.com');
} catch (err: unknown) {
  // Parse error natively handles Type Safety
  const errorObj: AppError = parseError(err);
  console.log(errorObj.statusCode); // 409
  console.log(errorObj.errorCode); // 'EMAIL_TAKEN'
}
```

### 5. 🖥 Raw Node.js (Generic Scripts / CLI)

If you have a backend cron job or script running, you can cleanly parse standard Node.js failures or wrap fatal crashes using our global handlers.

```javascript
const { setupProcessCrashHandlers, parseError } = require('universal-error-handler');

// Catch any unhandled Promise Rejections & Process Exceptions natively!
setupProcessCrashHandlers(); 

const processPayment = async () => {
   throw new TypeError('Cannot read properties of undefined'); 
}

processPayment().catch(err => {
    // Gracefully parse JS error into an internal exception object
    const finalErr = parseError(err);
    console.log(finalErr.message); // "Programming error encountered"
});
```

---

## 🦸 Extensible Use-Cases

### 1. Automatic Database & Validation Error Parsing 🗄️

If your ORM or validation library throws an error, `universal-error-handler` catches and sanitizes it for the frontend automatically.

**Handles out-of-the-box:**
- `Zod` Validation Issues (Array map extractions)
- `express-validator` (Array map extractions)
- `Mongoose / MongoDB` duplicates and cast errors
- `Sequelize` validation and constraint errors
- `Prisma` database logic errors (e.g. `P2002`)
- `Axios` Network Errors
- Native `TypeError` / `ReferenceError` *(Safely obscured as Internal Server Errors in production)*

### 2. Standardized Error Classes 📚

A suite of built-in domain errors subclassing `AppError`:
- `AppError`  (Base)
- `BadRequestError` (400)
- `UnauthorizedError` (401)
- `ForbiddenError` (403)
- `NotFoundError` (404)
- `ConflictError` (409)
- `UnprocessableEntityError` (422)
- `InternalServerError` (500)

```javascript
// Add error details for frontend consumption
throw new ConflictError('User already exists', 'DUPLICATE_USER', { email: 'test@example.com' });
```

### 3. Throw by String Code with Overrides ⌨️

You can simply throw Strings matching the 150+ pre-defined `CustomMessages` or your `customDictionary`.

```javascript
const { parseError } = require('universal-error-handler');

// Automatically resolves to HTTP 429 "Too Many Requests"
throw parseError('TOO_MANY_REQUESTS');

// Override the default message while keeping the status code!
throw parseError('NOT_FOUND', 'This specific article is gone!');

// Pass an object straight in!
throw parseError({ statusCode: 400, message: 'Bad param', details: { id: 'missing' } });
```

---

## 🛠️ Logging Configuration (Winston / Pino)

By default, the handler logs server faults (HTTP 500+) to `console`. You can inject Winston or Pino to standardise your logs.

```javascript
const { setLogger } = require('universal-error-handler');
const winston = require('winston');

const logger = winston.createLogger({ ... });
setLogger(logger); // Errors will now be streamed through Winston!
```


---

**Universal Error Handler** is crafted with precision to help you build resilient, production-ready applications. 

Made with ❤️ by **Mandeep Yadav** for Javascript Developers everywhere. 🚀
