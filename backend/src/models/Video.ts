import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.config"
import { User } from "./User"

export const Video = sequelize.define("User", {
    videoId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    titleOfVideo: {
        type: DataTypes.STRING,
        unique: true
    },
    descriptionOfVideo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    urlOfVideo: DataTypes.STRING,
    creatorOfVideo: {
        type: DataTypes.UUID,
        allowNull: false,
    }
})


sequelize.sync({alter:true})