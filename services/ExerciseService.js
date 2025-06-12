import { Exercise } from "../models/index.js";
import Movement from "../models/Movement.js";
import Muscle from "../models/Muscle.js";

class ExerciseService {
  getAllExercises = async () => {
    const exercises = await Exercise.findAll({
      include: [
        {
          model: Muscle,
          through: { attributes: [] }, // oculta la tabla intermedia
        },
        {
          model: Movement, // Si tu modelo tiene relación 1:N con Movement
        }
      ],
      order: [['id', 'ASC']]
    });

    return exercises;
  };

  getExerciseById = async (id) => {
    const exercise = await Exercise.findByPk(id, {
      include: [
        {
          model: Muscle,
          through: { attributes: [] },
        },
        {
          model: Movement,
        },
      ],
    });

    return exercise;
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

  updateExercise = async (id, data) => {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) throw new Error("Ejercicio no encontrado");

    const { name, musclesIds, movementId} = data;

    await exercise.update({ name });

    if (musclesIds) {
      await exercise.setMuscles(musclesIds);
    }
    if (movementId) {
      await exercise.setMovement(movementId);
    }
    return exercise;
  };

  deleteExercise = async (id) => {
    const exercise = await Exercise.findByPk(id);

    if (!exercise) return null;

    await exercise.destroy();

    return true;
  };

}

export default ExerciseService;
