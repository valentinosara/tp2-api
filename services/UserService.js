import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/jwt.js";

class UserServices {
  getAllUsers = async () => {
    const users = await User.findAll();
    return users;
  };

  getUserById = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  };


  createUser = async (data) => {
    const { id, name } = await User.create(data);
    return { id, name };
  };

  updateUser = async (id, { name, mail, pass }) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (name) user.name = name;
    if (mail) user.mail = mail;

    if (pass) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);
      user.pass = hash;
    }

    await user.save();
    return user;
  };

  deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();
    return { message: "User deleted successfully" };
  };

  login = async (data) => {
    const {mail, pass} = data;
    const user = await User.findOne({
      where: {mail},
    })
    if(!user) throw new Error("User not found");
    const comparePass = await user.compare(pass);
    if(!comparePass) throw new Error("Wrong Password");
    
    const payload={
      id: user.id,
      name: user.name
    };
    const token = generateToken(payload);
    return token
  }

  me = async (token) => {
    const user = verifyToken(token)
    return user;
  }
}

export default UserServices;
