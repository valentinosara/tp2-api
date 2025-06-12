// routes/muscleRoutes.js
import { Router } from "express";
import MuscleController from "../controllers/MuscleController.js";

const muscleRoutes = Router();
const muscleController = new MuscleController();

muscleRoutes.get("/", muscleController.getAllMuscles);
muscleRoutes.get("/:id", muscleController.getMuscleById);
muscleRoutes.post("/", muscleController.createMuscle);
muscleRoutes.put("/:id", muscleController.updateMuscle);
muscleRoutes.delete("/:id", muscleController.deleteMuscle);

export default muscleRoutes;
