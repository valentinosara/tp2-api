import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class RoutineExercise extends Model {}

RoutineExercise.init(
  {
    series: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Las series deben ser un número entero",
        },
        min: {
          args: [0],
          msg: "Las series no pueden ser negativas",
        },
      },
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Las repeticiones deben ser un número entero",
        },
        min: {
          args: [0],
          msg: "Las repeticiones no pueden ser negativas",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "RoutineExercise",
  }
);

export default RoutineExercise;