import Movement from "../models/Movement.js";

class MovementService {
  getAllMovements = async () => {
    const movements = await Movement.findAll({
      order: [['id', 'ASC']]
    });

    return movements;
  };

  getMovementById = async (id) => {
    const exercise = await Movement.findByPk(id);
    return exercise;
  };


  createExercise = async (data) => {
    const { name, musclesIds, movementId } = data;

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

export default MovementService;
