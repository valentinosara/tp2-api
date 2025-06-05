import UserServices from "../services/UserServices.js";

class UserControllers {
  userServices = new UserServices();

  getAllUsersControllers = async (req, res) => {
    const users = await this.userServices.getAllUsersService();
    res.status(200).send({
      success: true,
      message: users,
    });
  };
  getUserControllersById = (req, res) => {
    const { id } = req.params;
    const user = this.userServices.getUserServiceById(id);
    res.status(200).send({
      success: true,
      message: user,
    });
  };
  createUserControllers = async (req, res) => {
    try {
      const { name, mail, pass, RoleId } = req.body;
      const user = await this.userServices.createUserService({
        name,
        mail,
        pass,
        RoleId,
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
  updateUserControllers(req, res) {
    res.status(200).send("updateUserControllers");
  }
  deleteUserControllers(req, res) {
    res.status(200).send("deleteUserControllers");
  }
}

export default UserControllers;
