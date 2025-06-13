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
          message: "Ejercicio no encontrado",
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
    // try {
    //   const { id } = req.params;
    //   const { name, musclesIds, movementId } = req.body;

    //   const updatedRoutine = await this.routineService.updateRoutine(id, {
    //     name,
    //     musclesIds,
    //     movementId
    //   });

    //   res.status(200).send({
    //     success: true,
    //     message: updatedRoutine,
    //   });
    // } catch (error) {
    //   res.status(400).send({
    //     success: false,
    //     message: error.message,
    //   });
    // }
  };

  deleteRoutine = async (req, res) => {
    // try {
    //   const { id } = req.params;

    //   const deleted = await this.routineService.deleteRoutine(id);

    //   if (!deleted) {
    //     return res.status(404).send({
    //       success: false,
    //       message: "Ejercicio no encontrado",
    //     });
    //   }

    //   res.status(200).send({
    //     success: true,
    //     message: "Ejercicio eliminado correctamente",
    //   });
    // } catch (error) {
    //   res.status(400).send({
    //     success: false,
    //     message: error.message,
    //   });
    // }
  };

}

export default RoutineController;
