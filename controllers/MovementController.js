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
      const movement = await this.movementService.getMovementById(id);

      if (!movement) {
        return res.status(404).send({
          success: false,
          message: "Movimiento no encontrado",
        });
      }

      res.status(200).send({
        success: true,
        message: muscle,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  createExercise = async (req, res) => {
    try {
      const { name, musclesIds, movementId } = req.body;
      const exercise = await this.exerciseService.createExercise({
        name,
        musclesIds,
        movementId
      });
      res.status(200).send({
        success: true,
        message: exercise,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  updateExercise = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, musclesIds, movementId } = req.body;

      const updatedExercise = await this.exerciseService.updateExercise(id, {
        name,
        musclesIds,
        movementId
      });

      res.status(200).send({
        success: true,
        message: updatedExercise,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  deleteExercise = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.exerciseService.deleteExercise(id);

      if (!deleted) {
        return res.status(404).send({
          success: false,
          message: "Ejercicio no encontrado",
        });
      }

      res.status(200).send({
        success: true,
        message: "Ejercicio eliminado correctamente",
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
