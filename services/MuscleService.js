import { Muscle } from "../models/index.js";

class MuscleService {
  getAllMuscles = async () => {
    const muscles = await Muscle.findAll({
      order: [['id', 'ASC']],
    });
    return muscles;
  };

  getMuscleById = async (id) => {
    const muscle = await Muscle.findByPk(id);
    return muscle;
  };

  createMuscle = async (data) => {
    const muscle = await Muscle.create({ name: data.name });
    return muscle;
  };

  updateMuscle = async (id, data) => {
    const muscle = await Muscle.findByPk(id);
    if (!muscle) throw new Error("Músculo no encontrado");

    await muscle.update({ name: data.name });
    return muscle;
  };

  deleteMuscle = async (id) => {
    const muscle = await Muscle.findByPk(id);
    if (!muscle) return null;

    await muscle.destroy();
    return true;
  };
}

export default MuscleService;
