import { Router } from "express";
import rolesRoutes from "./rolesRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import movementRoutes from "./movementRoutes.js";

const routes= Router()

routes.use("/exercise",exerciseRoutes)
routes.use("/movement",movementRoutes)
routes.use("/roles", rolesRoutes)


export default routes