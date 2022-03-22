const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      is: ["/^[0-9a-f]{64}$/i"], // Validation for hashed password (Doesn't work with hooks?)
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        if (newUserData && newUserData.email) {
          newUserData.email = await newUserData.email.toLowerCase().trim();
        }
        if (newUserData && newUserData.password) {
          newUserData.password = await bcrypt.hash(newUserData.password, 12);
        }
        return newUserData;
      },
      beforeFind: async (userData) => {
        if (userData && userData.where && userData.where.email) {
          userData.where.email = await userData.where.email
            .toLowerCase()
            .trim();
        }
        return userData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData && updatedUserData.email) {
          updatedUserData.email = await updatedUserData.email
            .toLowerCase()
            .trim();
        }
        if (newUserData && newUserData.password) {
          newUserData.password = await bcrypt.hash(newUserData.password, 12);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
