import { Router } from "express";
import rolesRoutes from "./rolesRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";

const routes= Router()

routes.use("/exercise",exerciseRoutes)
routes.use("/movement",movementRoutes)
routes.use("/roles", rolesRoutes)
routes.use("/muscles", muscleRoutes);


export default routes