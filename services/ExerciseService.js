import { Exercise } from "../models/index.js";
import Movement from "../models/Movement.js";
import Muscle from "../models/Muscle.js";
import { Sequelize } from "sequelize";

class ExerciseService {
  getAllExercises = async () => {
    const exercises = await Exercise.findAll({
      include: [
        {
          model: Muscle,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: Movement,
          attributes: ['name']
        }
      ],
      attributes: [
        'id',
        'name'
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
          attributes: ['id', 'name']
        },
      ],
      attributes: ['id', 'name']
    });

    return exercise;
  };


  createExercise = async (data) => {
    const { name, musclesIds, MovementId } = data;

    const exercise = await Exercise.create({ name, MovementId });

    if (musclesIds && musclesIds.length > 0) {
      await exercise.setMuscles(musclesIds);
    }
    return exercise;
  };

  updateExercise = async (id, data) => {
    const exercise = await Exercise.findByPk(id);
    if (!exercise) throw new Error("Ejercicio no encontrado");

    const { name, musclesIds, MovementId} = data;
    console.log(data);
    await exercise.update({ name, MovementId });

    if (musclesIds) {
      await exercise.setMuscles(musclesIds);
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
