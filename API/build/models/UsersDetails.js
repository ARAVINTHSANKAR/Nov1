"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
/**config */
var dbConnection_1 = require("../config/dbConnection");
exports.UserTableStructure = dbConnection_1.sequelize.define('UsersDetails', {
    name: {
        type: Sequelize.STRING
    },
    userRoleId: {
        type: Sequelize.NUMBER
    },
    password: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.STRING
    },
    isActive: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});
