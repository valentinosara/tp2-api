import Exercise from "./Exercise.js";
import Role from "./Role.js";
import Routine from "./Routine.js";
import RoutineExercise from "./RoutineExercise.js";
import User from "./User.js";

//EJERCICIO - SERIES - REPS
RoutineExercise.hasOne(Exercise,{
     foreignKey:"exerciseId"
})
Exercise.hasMany(RoutineExercise)

RoutineExercise.hasOne(Routine,{
     foreignKey:"routineId"
})




Role.hasMany(User, {
     foreignKey:"roleId"
})
User.belongsTo(Role, {
     foreignKey:"roleId"
})


export {User, Role}