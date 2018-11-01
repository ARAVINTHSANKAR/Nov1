"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require('mssql');
var DBConnection = /** @class */ (function () {
    function DBConnection() {
    }
    DBConnection.executeQuery = function (query, res) {
        var config = {
            server: 'localhost',
            database: 'projectX',
            user: 'sa',
            password: '@@@susS7',
            port: 1433
        };
        sql.connect(config, function (err) {
            if (err) {
                console.log("Error while connecting database :" + err);
                res.send('Server Down');
            }
            else {
                var request = new sql.Request();
                request.query(query, function (err, val) {
                    if (err) {
                        console.log("Error while querying database :- " + err);
                        res.send('Error while querying database');
                    }
                    else {
                        res.send(val);
                    }
                });
            }
        });
    };
    return DBConnection;
}());
exports.DBConnection = DBConnection;
