import RoutineService from "../services/RoutineService.js";

class RoutineController {
  routineService = new RoutineService();

  getAllRoutines = async (req, res) => {
    try {
      const routines = await this.routineService.getAllRoutines();

      res.status(200).send({
        success: true,
        message: routines,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  getRoutineById = async (req, res) => {
    try {
      const { id } = req.params;

      const routine = await this.routineService.getRoutineById(id);

      if (!routine) {
        return res.status(404).send({
          success: false,
          message: "Rutina no encontrada",
        });
      }

      res.status(200).send({
        success: true,
        message: routine,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  createRoutine = async (req, res) => {
    try {
      const routine = await this.routineService.createRoutine(req.body);
      res.status(200).send({
        success: true,
        message: routine,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };


  updateRoutine = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        rest_bt_exercises,
        rest_bt_series,
        daysIds,
        routineExercises
      } = req.body;

      const routine = await this.routineService.updateRoutine(id, {
        name,
        rest_bt_exercises,
        rest_bt_series,
        daysIds,
        routineExercises
      });

      res.status(200).send({
        success: true,
        message: routine,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };


  deleteRoutine = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await this.routineService.deleteRoutine(id);

      res.status(200).send({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };


}

export default RoutineController;
