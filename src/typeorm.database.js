"use strict";
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var connection = function () {
    return typeorm_1.createConnection({
        type: "postgres",
        database: "tasks",
        url: process.env.POSTGRES_URL,
        entities: [__dirname + "/../../src/entity/*/.model.js"],
        synchronize: true
    });
};
exports["default"] = connection;
