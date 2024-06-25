import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.config"

export const User = sequelize.define("User", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        unique: true
    },
    emailOfUser: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:"user",
        allowNull:false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.sync()