import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Exercise extends Model {}

Exercise.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    sequelize: connection,
    modelName: "Exercise",
  }
);

export default Exercise;
