// routes/muscleRoutes.js
import { Router } from "express";
import MuscleController from "../controllers/MuscleController.js";

const router = Router();
const muscleController = new MuscleController();

router.get("/", muscleController.getAllMuscles);
router.get("/:id", muscleController.getMuscleById);
router.post("/", muscleController.createMuscle);
router.put("/:id", muscleController.updateMuscle);
router.delete("/:id", muscleController.deleteMuscle);

export default router;
