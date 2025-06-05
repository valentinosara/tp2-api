import { Router } from "express";
import UserControllers from "../controllers/userControllers.js";

const userControllers = new UserControllers();

const userRoutes = Router();

userRoutes.get("/", userControllers.getAllUsersControllers);
userRoutes.get("/:id", userControllers.getUserControllersById);
userRoutes.post("/", userControllers.createUserControllers);
userRoutes.put("/:id", userControllers.updateUserControllers);
userRoutes.delete("/:id", userControllers.deleteUserControllers);

export default userRoutes;
