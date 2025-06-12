import { Router } from "express";
import MovementController from "../controllers/MovementController.js";

const movementController = new MovementController();

const movementRoutes = Router();

movementRoutes.get("/", movementController.getAllMovements);
movementRoutes.get("/:id", movementController.getMovementById);
movementRoutes.post("/", movementController.createExercise);
movementRoutes.put("/:id", movementController.updateExercise);
movementRoutes.delete("/:id", movementController.deleteExercise);

export default movementRoutes;
