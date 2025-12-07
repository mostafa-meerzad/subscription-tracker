import express from 'express';
import {PORT} from './config/env.js';

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Subscription Tracker API is running at http://localhost:${ PORT }`);
})