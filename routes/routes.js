import { Router } from "express";
import userRoutes from "./userRoutes.js";
import rolesRoutes from "./rolesRoutes.js";

const routes= Router()

routes.use("/users",userRoutes)
routes.use("/roles", rolesRoutes)


export default routes