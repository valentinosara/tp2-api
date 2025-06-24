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
  
  getUserById = async (req, res) => {
    try {
      const { id } = req.params;

      const user = await this.userService.getUserById(id);

      res.status(200).send({
        success: true,
        message: user,
      });
    } catch (error) {
      res.status(404).send({
        success: false,
        message: error.message,
      });
    }
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

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, mail, pass } = req.body;

      const updatedUser = await this.userService.updateUser(id, {
        name,
        mail,
        pass,
      });

      res.status(200).send({
        success: true,
        message: updatedUser,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await this.userService.deleteUser(id);

      res.status(200).send({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  login = async (req, res) => {
    try {
      const { mail, pass } = req.body;
      const token = await this.userService.login({mail,pass});
      res.cookie("login", token)
      res.status(200).send({
        success: true,
        message: "User logued succesfully",
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  };

  me = async (req, res) => {
    try {
      const { login } = req.cookies;
      const user = await this.userService.me(login);
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
}

export default UserController;
