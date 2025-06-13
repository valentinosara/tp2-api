import UserService from "../services/UserService.js";

class UserController {
  userService = new UserService();

  getAllUsers = async (req, res) => {
    const users = await this.userService.getAllUsers();
    res.status(200).send({
      success: true,
      message: users,
    });
  };
  getUserById = (req, res) => {
    const { id } = req.params;
    const user = this.userService.getUserById(id);
    res.status(200).send({
      success: true,
      message: user,
    });
  };
  createUser = async (req, res) => {
    try {
      const { name, mail, pass} = req.body;
      const user = await this.userService.createUser({
        name,
        mail,
        pass,
      });
      res.status(200).send({
        success: true,
        message: user,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };
  updateUser(req, res) {
    res.status(200).send("updateUserControllers");
  }
  deleteUser(req, res) {
    res.status(200).send("deleteUserControllers");
  }
}

export default UserController;
