import mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

const connection: mysql.Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function dbQuery(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

export { dbQuery };
export default connection;
