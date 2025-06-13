import Day from "./Day.js";
import Exercise from "./Exercise.js";
import Movement from "./Movement.js";
import Muscle from "./Muscle.js";
import Routine from "./Routine.js";
import RoutineExercise from "./RoutineExercise.js";
import User from "./User.js";

//EJERCICIO - SERIES - REPS
RoutineExercise.hasOne(Exercise,{
     foreignKey:"id"
})
Exercise.hasMany(RoutineExercise)

RoutineExercise.hasOne(Routine,{
     foreignKey:"id"
})
Routine.hasMany(RoutineExercise)

Routine.hasOne(User, {
     foreignKey: "id"
})
User.hasMany(Routine)


// RELACIÓN N:M entre Routine y Day ---> Muchos a muchos
Routine.belongsToMany(Day, { through: "DayRoutines"});
Day.belongsToMany(Routine, { through: "DayRoutines"});

Exercise.belongsToMany(Muscle, { through: "ExerciseMuscle" });
Muscle.belongsToMany(Exercise, { through: "ExerciseMuscle" });

Exercise.hasOne(Movement, {
     foreignKey: "id"
})
Movement.hasMany(Exercise)

export {Muscle, Routine, Day, Exercise, RoutineExercise}