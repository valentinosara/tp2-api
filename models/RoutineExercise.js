import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class RoutineExercise extends Model {}

RoutineExercise.init(
  {
    series: DataTypes.INTEGER,
    reps: DataTypes.INTEGER
  },
  {
    sequelize: connection,
    modelName: "RoutineExercise",
  }
);

export default RoutineExercise;