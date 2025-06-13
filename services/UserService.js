import { User } from "../models/index.js";

class UserServices {
  getAllUsers = async () => {
    const users = await User.findAll();
    return users;
  };
  getUserById = (id) => {
    return `getUserServiceById ${id}`;
  };

  createUser = async (data) => {
    const { id, name } = await User.create(data);
    return { id, name };
  };
}

export default UserServices;
