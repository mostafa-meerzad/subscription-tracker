# Start a Node/Express Project

1. create a directory for it e.x: Learning-Node
2. use `express-generator` to generate the initial structure of the application;
   `npx express-generator --no-view --git ./`
3. install a linter to catch bugs and maintain clean code, `npx eslint --init` and follow instructions.
4. configure `environment variables` first install `dontenv` package:

- create a `config` folder in the root of your project
- add an env.js file in it with the following content:

```js
import {config} from "dotenv";

// config({path: ".env"}) for having a single .env file
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {PORT, NODE_ENV} = process.env
```

- create a `.env.development.local` and `.env.production.local` files in the root of the project
  each one would contain the details for development and production stages of the application.
- `.env.development.local` file content example:

```js
PORT = 5500
```

`Note`: to change environment to `production` just add `NODE_ENV=production` in the `.env.production.local` file and
that's it, for development it's already set to `development` by default.

## Build the API structure

First create a `routes` directory in the root of your app, then inside it
create a file for each route like `auth.routes.js` for the auth route.
`Note`: add `.rotues` to the name of the file, to make it more intuitive and clear, as each file contains many endpoints
related for that route.

`Note`: read this naming convention specs for better understanding of restfull APIs.

### why to have versions in APIs like `v1` in `api/v1/users`, and why you should use it too

Developers add **`v1`** (or `v2`, `v3`, etc.) to API URLs for **versioning**.
It’s one of the most important best practices in backend development.

Here’s why it exists and why you should use it too:

---

# ✅ **Why APIs use `/v1` in the URL**

## **1. To avoid breaking existing clients**

Imagine you released an endpoint:

```
GET /api/v1/users
```

Hundreds of clients/apps are using it.

Later, you need to change the response structure, rename fields, or change logic.
If you modified the existing endpoint directly, **everything using it would break**.

Instead, you make a new version:

```txt
GET /api/v2/users
```

Clients can upgrade when they’re ready — nothing breaks.

---

## **2. You can redesign your API without fear**

Example:

`v1` response:

```json
{
  "id": 1,
  "name": "Mostafa",
  "email": "test@example.com"
}
```

`v2` response can be:

```json
{
  "user": {
    "id": 1,
    "fullName": "Mostafa Meerzad"
  }
}
```

Both versions work at the same time.

---

## **3. It's professional, scalable API design**

Good companies **always version their APIs**:

* Stripe → `/v1/...`
* Google → `/v1/...`, `/v1beta/...`
* Twitter → `/1.1/...`, `/2/...`
* GitHub → `/v3/...`

Because real-world apps evolve.

---

## **4. Makes your API more maintainable**

You can:

* Deprecate old versions slowly
* Add new features to new versions
* Fix bugs without affecting stable clients

---

## **5. Allows internal and external apps to use different versions**

Your frontend might use `/api/v2`,
but a mobile app still uses `/api/v1`.

No conflicts.

---

# 🔥 **TL;DR**

Adding `/v1` means:

👉 **This is version 1 of the API**
👉 Safe to update later without breaking past users
👉 Allows multiple versions to run in parallel
👉 Makes API design scalable and professional


## The app.js file, the main entry point of your application

the `app.js` file is the amin entry point to your `Express` app and all the routes come together here to for the whole app.

`use()` method from the Express instance is used to apply `Middlewares` and `Routes` as well,

```js
import express from 'express';
import {PORT} from './config/env.js';
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/subscriptions", subscriptionRouter);

app.get('/', (req, res) => {
    return res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Subscription Tracker API is running at http://localhost:${PORT}`);
})

```

## Create Modals

In the root of your project create a separate folder `modals` that you put your mongoose modals there
each modal is separate into it's own file and all the related code goes in that file. this way you keep a clean codebase

## Global Error Handler

Here’s a **clean, practical, beginner-friendly but pro-level explanation** of the **structure of Express middleware** and **how to properly write one** — including normal middleware and **error-handling middleware**.

---

# 🌟 **1. What Is a Middleware in Express?**

A middleware is **a function** that executes **between** a request and a response.

Every middleware gets **3 arguments**:

```
(req, res, next)
```

where:

* `req` → request object
* `res` → response object
* `next` → function to call the next middleware/route

---

# 🌟 **2. Standard Middleware Structure**

A normal middleware function looks like this:

```js
function myMiddleware(req, res, next) {
    // 1. Do something with the request
    console.log(req.method, req.url);

    // 2. Either:
    //    → pass control to next middleware
    next();

    // OR block request:
    // res.status(403).json({ message: "Forbidden" });
}
```

### 🌐 Typical Uses:

* logging
* authentication
* validating requests
* parsing JSON
* checking permissions
* rate limiting

---

# 🌟 **3. Error-Handling Middleware Structure**

This is the special one.

It has **4 arguments**:

```
(err, req, res, next)
```

That’s how Express recognizes it as an error middleware.

Example:

```js
function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    // Only show stack in development:
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
```

### 👀 Important:

✔️ Must come **after all routes**
✔️ Must include **4 parameters**
✔️ Handles any error passed using `next(err)` or thrown inside async routes

---

# 🌟 **4. How to Properly Write a Middleware (Best Practices)**

Let's go step by step.

---

## ✔️ Step 1 — Use a named function or arrow function

```js
const myMiddleware = (req, res, next) => {
  // your logic
  next();
};
```

---

## ✔️ Step 2 — Always decide whether to call `next()` or end the request

A middleware must do *one* of these:

### Option A — Allow request to continue

```js
next();
```

### Option B — Stop the request and send a response

```js
return res.status(401).json({ message: "Not authorized" });
```

### ❌ Never do both:

```js
res.json(...);
next(); // WRONG
```

---

## ✔️ Step 3 — When writing async middleware ALWAYS use try/catch

Because async functions don't automatically catch errors.

Example:

```js
const checkUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    next(err); // Pass error to error handler
  }
};
```

---

# 🌟 **5. Putting It All Together: Full Middleware Example**

Let’s create a **request logger** middleware.

### 🔹 Logger Middleware

```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
```

### Attach to app:

```js
app.use(logger);
```

---

### 🔹 Authentication Middleware

```js
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // ... verify token
  next();
};
```

---

### 🔹 Route

```js
app.get("/profile", auth, (req, res) => {
  res.json({ message: "Welcome to the profile" });
});
```

---

### 🔹 Error Middleware (always last)

```js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});
```

---

# 🌟 **6. Folder Structure for Clean Middleware**

Here’s the recommended structure:

```
project/
│
├── middlewares/
│   ├── auth.js
│   ├── logger.js
│   ├── errorHandler.js
│
├── routes/
│   ├── userRoutes.js
│
├── app.js
└── server.js
```

### Example `errorHandler.js`:

```js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
```

---

# 🌟 **7. Summary (Quick Cheat Sheet)**

### ✔️ **Normal middleware**

```js
(req, res, next) => { ...; next(); }
```

### ✔️ **Error middleware**

```js
(err, req, res, next) => { ... }
```

### ✔️ Must come after routes

### ✔️ Use try/catch for async

### ✔️ Must choose between `next()` or sending a response

---

If you want, I can generate:

🔥 a full Express app boilerplate with proper middleware
🔥 custom error classes (ApiError)
🔥 async wrapper (`catchAsync`) so you don’t write try/catch
🔥 real examples with authentication, validation, or logging

Just tell me what you'd like!
 