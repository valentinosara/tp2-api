import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middleWares/userMiddlewares.js";

const userController = new UserController();

const userRoutes = Router();

userRoutes.get("/me", userController.me);
userRoutes.post("/login", userController.login);
userRoutes.get("/:id", authMiddleware, userController.getUserById);
userRoutes.get("/", authMiddleware, userController.getAllUsers);
userRoutes.post("/", userController.createUser);
userRoutes.put("/:id", authMiddleware, userController.updateUser);
userRoutes.delete("/:id", authMiddleware, userController.deleteUser);

export default userRoutes;
