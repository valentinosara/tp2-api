import { User } from "../models/index.js";

class UserServices {
  getAllUsersService = async () => {
    const users = await User.findAll();
    return users;
  };
  getUserServiceById = (id) => {
    return `getUserServiceById ${id}`;
  };

  createUserService = async (data) => {
    const { id, name } = await User.create(data);
    return { id, name };
  };
}

export default UserServices;
