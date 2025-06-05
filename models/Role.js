import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Role extends Model {}

Role.init(
  {
    roleName: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: "user",
    },
  },
  {
    sequelize: connection,
    modelName: "Role",
  }
);

export default Role;
