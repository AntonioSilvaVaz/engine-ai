"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = require('./router');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;
const corsConfig = {
    origin: `http://localhost:${process.env.FRONT_END_PORT}`,
    credentials: true,
};
app.use(cors(corsConfig));
app.use(router);
const server = app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}/`));
module.exports = server;
