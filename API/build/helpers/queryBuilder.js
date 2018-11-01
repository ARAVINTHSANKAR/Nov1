"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryHelper = /** @class */ (function () {
    function QueryHelper() {
    }
    QueryHelper.addUser = function (userDetails) {
        // console.log(userDetails);
        // return 'INSERT INTO UsersDetails (name, userRoleId, password, contact, isActive) VALUES ('+userDetails.name+', '+userDetails.role+', '+userDetails.password+','+userDetails.contact+', '+userDetails.isActive+')';
        return "INSERT INTO UsersDetails (name, userRoleId, password, contact, isActive)\n        VALUES ('bs', 2, 234, 8617, 0)";
    };
    return QueryHelper;
}());
exports.QueryHelper = QueryHelper;
