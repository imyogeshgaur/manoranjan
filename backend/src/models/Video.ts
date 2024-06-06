import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.config"

export const Video = sequelize.define("Video", {
    videoId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    titleOfVideo: DataTypes.STRING,
    descriptionOfVideo: DataTypes.STRING,
    urlOfVideo: DataTypes.STRING,
    creatorOfVideo: {
        type: DataTypes.UUID,
        allowNull: false,
    }
})

Video.sync()