require("dotenv").config();

module.exports = {
  development: {
    server: "SQLEXPRESS",
    username: "sa",
    database: "ProjectTest",
    password: "abc123@",
    port: 1433,
    dialect: "mssql",

    dialectOptions: {
      options: {
        useUTC: true,
        requestTimeout: 900000,
      },
    },
    timezone: "-03:00",
  },
};