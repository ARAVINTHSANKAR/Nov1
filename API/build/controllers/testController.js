"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dbConnection_1 = require("../config/dbConnection");
var router = express_1.Router();
router.get("/new", function (req, res) {
    var query = "select * from [user]";
    dbConnection_1.DBConnection.executeQuery(res, query);
});
exports.testController = router;
