import Movement from "../models/Movement.js";

class MovementService {
  getAllMovements = async () => {
    const movements = await Movement.findAll({
      order: [['id', 'ASC']]
    });

    return movements;
  };

  getMovementById = async (id) => {
    const movement = await Movement.findByPk(id);
    return movement;
  };


  createMovement = async (data) => {
    const { name } = data;

    const movement = await Movement.create({ name });
    return movement;
  };

  updateMovement = async (id, data) => {
    const movement = await Movement.findByPk(id);
    if (!movement) throw new Error("Movimiento no encontrado");

    const { name } = data;

    await movement.update({ name });
    return movement;
  };

  deleteMovement = async (id) => {
    const movement = await Movement.findByPk(id);

    if (!movement) return null;

    await movement.destroy();

    return true;
  };

}

export default MovementService;
