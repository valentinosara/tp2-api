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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-z\s]+$/],
          msg: "El nombre solo puede contener letras y espacios",
        },
      },
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "El mail debe tener un formato válido",
        },
      },
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: "La contraseña debe tener al menos 8 caracteres",
        },
      },
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
