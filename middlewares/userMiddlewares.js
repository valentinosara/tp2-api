import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/index.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.login;
    if (!token) {
      return res.status(401).json({ success: false, message: "You should be logued to access to this" });
    }

    const decoded = verifyToken(token);
    const userId = decoded.data.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authMiddleware;