import { Sequelize } from "sequelize";

const connection = new Sequelize("miercoles", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 8889,//3306 para xamp// 1433 para sqlserver
});

try {
  await connection.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
export default connection;
