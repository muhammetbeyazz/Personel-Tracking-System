const mysql = require("mysql2/promise");

// MySQL bağlantı havuzunu oluştur
const pool = mysql.createPool({
  host: "localhost",
  user: "",
  password: "",
  database: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
  collation: "utf8mb4_unicode_ci",
});

module.exports = pool;
