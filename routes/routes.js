import { Router } from "express";
import rolesRoutes from "./rolesRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import muscleRoutes from "./muscleRoutes.js";



const routes= Router()

routes.use("/exercise",exerciseRoutes)
routes.use("/roles", rolesRoutes)
routes.use("/muscles", muscleRoutes);


export default routes