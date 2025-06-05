import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Day extends Model {}

Day.init(
  {
    name: DataTypes.STRING,
    order: DataTypes.INTEGER
  },
  {
    sequelize: connection,
    modelName: "Day",
  }
);

export default Day;