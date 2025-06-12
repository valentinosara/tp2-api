import { Router } from "express";
import MovementController from "../controllers/MovementController.js";

const movementController = new MovementController();

const movementRoutes = Router();

movementRoutes.get("/", movementController.getAllMovements);
movementRoutes.get("/:id", movementController.getMovementById);
movementRoutes.post("/", movementController.createMovement);
movementRoutes.put("/:id", movementController.updateMovement);
movementRoutes.delete("/:id", movementController.deleteMovement);

export default movementRoutes;
