# Start a Node/Express Project

1. create a directory for it e.x: Learning-Node
2. use `express-generator` to generate the initial structure of the application; `npx express-generator --no-view --git ./` 
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
PORT=5500
```

`Note`: to change environment to `production` just add `NODE_ENV=production` in the `.env.production.local` file and that's it, for development it's already set to `development` by default.

