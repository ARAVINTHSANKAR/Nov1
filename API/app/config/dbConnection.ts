import * as Sequelize from "sequelize";

export const sequelize = new Sequelize("ProjectX", "sa", "@@@susS7", {
    host: "localhost",
    port: 1433,
    dialect: "mssql"
});

sequelize.authenticate()
.then(function () {
    console.log("CONNECTED!");
})
.catch(function (err: Error) {
    console.log("FAILED", err);
});
