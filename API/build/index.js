"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var controllers_1 = require("./controllers");
var app = express();
var port = 3000;
var baseUrl = '/shop';
app.use(bodyParser.json());
app.use(baseUrl, controllers_1.signUpController);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
