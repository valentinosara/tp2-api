import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Routine extends Model {}

Routine.init(
  {
    name: DataTypes.STRING,
    rest_bt_series: DataTypes.INTEGER,
    rest_bt_exercises: DataTypes.INTEGER
  },
  {
    sequelize: connection,
    modelName: "Routine",
  }
);

export default Routine;
