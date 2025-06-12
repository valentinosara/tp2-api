import { Exercise } from "../models/index.js";

class ExerciseService {
  getAllExercises = async () => {
    const Exercises = await Exercise.findAll();
    return Exercises;
  };

  getExerciseById = (id) => {
    //Arreglar
    return `getUserServiceById ${id}`;
  };

  createExercise = async (data) => {
    const { name, musclesIds, movementId } = data; // muscleIds es un array de IDs de músculos

    const exercise = await Exercise.create({ name });

    if (musclesIds && musclesIds.length > 0) {
      await exercise.setMuscles(musclesIds);
    }
    if (movementId) {
      await exercise.setMovement(movementId);
    }
    return exercise;
  };
}

export default ExerciseService;
