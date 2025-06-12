import MuscleService from "../services/MuscleService.js";

class MuscleController {
  muscleService = new MuscleService();

  getAllMuscles = async (req, res) => {
    try {
      const muscles = await this.muscleService.getAllMuscles();
      res.status(200).send({ success: true, message: muscles });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getMuscleById = async (req, res) => {
    try {
      const { id } = req.params;
      const muscle = await this.muscleService.getMuscleById(id);

      if (!muscle) {
        return res.status(404).send({ success: false, message: "Músculo no encontrado" });
      }

      res.status(200).send({ success: true, message: muscle });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createMuscle = async (req, res) => {
    try {
      const { name } = req.body;
      const muscle = await this.muscleService.createMuscle({ name });
      res.status(200).send({ success: true, message: muscle });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateMuscle = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedMuscle = await this.muscleService.updateMuscle(id, { name });

      res.status(200).send({ success: true, message: updatedMuscle });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteMuscle = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.muscleService.deleteMuscle(id);

      if (!deleted) {
        return res.status(404).send({ success: false, message: "Músculo no encontrado" });
      }

      res.status(200).send({ success: true, message: "Músculo eliminado correctamente" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default MuscleController;

