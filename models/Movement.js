import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Movement extends Model {}

Movement.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-z\s]+$/],
          msg: "El nombre solo puede contener letras y espacios",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Movement",
  }
);

export default Movement;