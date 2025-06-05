import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Movement extends Model {}

Movement.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "Movement",
  }
);

export default Movement;