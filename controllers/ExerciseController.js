import ExerciseService from "../services/ExerciseService.js";

class ExerciseController {
  exerciseService = new ExerciseService();

  getAllExercises = async (req, res) => {
    const exercises = await this.exerciseService.getAllExercises();
    res.status(200).send({
      success: true,
      message: exercises,
    });
  };
  getExerciseById = (req, res) => {
    const { id } = req.params;
    const exercise = this.exerciseService.getExerciseServiceById(id);
    res.status(200).send({
      success: true,
      message: exercise,
    });
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
  updateExercise(req, res) {
    res.status(200).send("updateExerciseControllers");
  }
  deleteExercise(req, res) {
    res.status(200).send("deleteExerciseControllers");
  }
}

export default ExerciseController;
