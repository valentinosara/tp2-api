import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {
  compare=async(flatPass)=>{
    const comparePass = await bcrypt.compare(flatPass, this.pass);
    return comparePass;
  }
}

User.init(
  {
    name: DataTypes.STRING(50),
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      mail: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.pass, salt);
  user.pass = hash;
});

export default User;
