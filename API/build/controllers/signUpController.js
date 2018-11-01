"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dao_1 = require("../dao/dao");
var router = express_1.Router();
router.post('/addUser', function (req, res) {
    dao_1.dao.addAccessor(req, res);
});
exports.signUpController = router;
