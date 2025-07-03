import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Routine extends Model {}

Routine.init(
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
    rest_bt_series: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "El descanso entre series debe ser un número entero",
        },
        min: {
          args: [0],
          msg: "El descanso entre series no puede ser negativo",
        },
      },
    },
    rest_bt_exercises: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "El descanso entre ejercicios debe ser un número entero",
        },
        min: {
          args: [0],
          msg: "El descanso entre ejercicios no puede ser negativo",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Routine",
  }
);

export default Routine;