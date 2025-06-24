import ExerciseService from "../services/ExerciseService.js";

class ExerciseController {
  exerciseService = new ExerciseService();

  getAllExercises = async (req, res) => {
    try {
      const exercises = await this.exerciseService.getAllExercises();

      res.status(200).send({
        success: true,
        message: exercises,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getExerciseById = async (req, res) => {
    try {
      const { id } = req.params;

      const exercise = await this.exerciseService.getExerciseById(id);

      if (!exercise) {
        return res.status(404).send({
          success: false,
          message: "Ejercicio no encontrado",
        });
      }

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

  createExercise = async (req, res) => {
    try {
      const { name, musclesIds, MovementId } = req.body;
      const exercise = await this.exerciseService.createExercise({
        name,
        musclesIds,
        MovementId
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
      const { name, musclesIds, MovementId } = req.body;

      const updatedExercise = await this.exerciseService.updateExercise(id, {
        name,
        musclesIds,
        MovementId
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

export default ExerciseController;

// {
//   "name": "Pull",
//   "MovementId" : 1,
//   "musclesIds" : [1, 2, 3]
// }