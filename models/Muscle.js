import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Muscle extends Model {}

Muscle.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "Muscle",
  }
);

export default Muscle;