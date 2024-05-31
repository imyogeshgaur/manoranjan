import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.config"
import { Video } from "./Video"

export const User = sequelize.define("User", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement:true
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
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoOfCreator:DataTypes.UUID
})

User.hasMany(Video,{as:"videoOfCreator",foreignKey:'videoId'})
Video.belongsTo(User,{as:"creatorOfVideo",foreignKey:'userId'})
sequelize.sync({alter:true})