import { Router } from "express";
import rolesRoutes from "./rolesRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import movementRoutes from "./movementRoutes.js";
import muscleRoutes from "./muscleRoutes.js";

const routes= Router()

routes.use("/exercise",exerciseRoutes)
routes.use("/movement",movementRoutes)
routes.use("/roles", rolesRoutes)
routes.use("/muscle", muscleRoutes);


export default routes