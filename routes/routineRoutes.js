import { Router } from "express";
import RoutineController from "../controllers/RoutineController.js";
import authMiddleware from "../middleWares/userMiddlewares.js";

const routineController = new RoutineController();

const routineRoutes = Router();

routineRoutes.use(authMiddleware);

routineRoutes.get("/", routineController.getAllRoutines);
routineRoutes.get("/:id", routineController.getRoutineById);
routineRoutes.post("/", routineController.createRoutine);
routineRoutes.put("/:id", routineController.updateRoutine);
routineRoutes.delete("/:id", routineController.deleteRoutine);

export default routineRoutes;
