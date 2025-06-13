import { Router } from "express";
import userRoutes from "./userRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import movementRoutes from "./movementRoutes.js";
import muscleRoutes from "./muscleRoutes.js";
import routineRoutes from "./routineRoutes.js";

const routes= Router()

routes.use("/exercise",exerciseRoutes)
routes.use("/movement",movementRoutes)
routes.use("/user", userRoutes)
routes.use("/muscle", muscleRoutes);
routes.use("/routine", routineRoutes);

export default routes