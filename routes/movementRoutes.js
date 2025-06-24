import { Router } from "express";
import MovementController from "../controllers/MovementController.js";
import authMiddleware from "../middleWares/userMiddlewares.js";

const movementController = new MovementController();

const movementRoutes = Router();

movementRoutes.use(authMiddleware);

movementRoutes.get("/", movementController.getAllMovements);
movementRoutes.get("/:id", movementController.getMovementById);
movementRoutes.post("/", movementController.createMovement);
movementRoutes.put("/:id", movementController.updateMovement);
movementRoutes.delete("/:id", movementController.deleteMovement);

export default movementRoutes;
