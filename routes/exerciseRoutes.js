import { Router } from "express";
import ExerciseController from "../controllers/ExerciseController.js";
import authMiddleware from "../middleWares/userMiddlewares.js";

const exerciseController = new ExerciseController();

const exerciseRoutes = Router();

exerciseRoutes.use(authMiddleware);

exerciseRoutes.get("/", exerciseController.getAllExercises);
exerciseRoutes.get("/:id", exerciseController.getExerciseById);
exerciseRoutes.post("/", exerciseController.createExercise);
exerciseRoutes.put("/:id", exerciseController.updateExercise);
exerciseRoutes.delete("/:id", exerciseController.deleteExercise);

export default exerciseRoutes;
