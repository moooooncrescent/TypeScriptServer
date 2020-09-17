"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const connection = () => typeorm_1.createConnection({
    type: "postgres",
    database: "tasks",
    url: process.env.POSTGRES_URL,
});
exports.default = connection;
