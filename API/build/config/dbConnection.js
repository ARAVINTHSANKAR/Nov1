"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
exports.sequelize = new Sequelize("ProjectX", "sa", "@@@susS7", {
    host: "localhost",
    port: 1433,
    dialect: "mssql"
});
exports.sequelize.authenticate()
    .then(function () {
    console.log("CONNECTED!");
})
    .catch(function (err) {
    console.log("FAILED", err);
});
