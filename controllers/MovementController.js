import MovementService from "../services/MovementService.js";

class MovementController {
  movementService = new MovementService();

  getAllMovements = async (req, res) => {
    try {
      const muscles = await this.movementService.getAllMovements();
      res.status(200).send({
        success: true,
        message: muscles,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };


  getMovementById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const movement = await this.movementService.getMovementById(id);
      if (!movement) {
        return res.status(404).send({
          success: false,
          message: "Movimiento no encontrado",
        });
      }

      res.status(200).send({
        success: true,
        message: movement,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  createMovement = async (req, res) => {
    try {
      const { name } = req.body;
      const movement = await this.movementService.createMovement({name});
      res.status(200).send({
        success: true,
        message: movement,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  updateMovement = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedMovement = await this.movementService.updateMovement(id, {name});

      res.status(200).send({
        success: true,
        message: updatedMovement,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  deleteMovement = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.movementService.deleteMovement(id);

      if (!deleted) {
        return res.status(404).send({
          success: false,
          message: "Movimiento no encontrado",
        });
      }

      res.status(200).send({
        success: true,
        message: "Movimiento eliminado correctamente",
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

}

export default MovementController;
