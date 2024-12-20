import mysql from "mysql2";
import fs from "fs";

// Access environment variables directly
const mysqlHost = process.env.MYSQL_HOST;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlDatabase = process.env.MYSQL_DATABASE;
const mysqlPort = process.env.DATABASE_PORT;
const mysqlSSL = process.env.DB_SSL_CA;


// Check if environment variables are set.  This is very important
if (!mysqlHost || !mysqlUser || !mysqlPassword || !mysqlDatabase) {
  throw new Error("Missing MySQL environment variables. Please set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE.");
}


// Create a connection pool to the database
const pool = mysql.createPool({
    host: mysqlHost,
    port: mysqlPort ? parseInt(mysqlPort) : 3306,
    user: mysqlUser, 
    password: mysqlPassword,
    database: mysqlDatabase,
    ssl: mysqlSSL ? { ca: fs.readFileSync(mysqlSSL) } : undefined // Path to the downloaded CA certificate
});

const promisePool = pool.promise();

export const query = async (sql: string, values: any[]) => {
  try {
    const [results] = await promisePool.query(sql, values);
    console.log("Database Results:", results);
    return results;
  } catch (error) {
    console.error("Database Error:", error);
  }
};