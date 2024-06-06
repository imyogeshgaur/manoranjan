import { Video } from "../models/Video";
import decodeUser from "../utils/decodeUser"
import { v4 } from "uuid";
class VideoService {

    private videoModel: any
    constructor() {
        this.videoModel = Video;
    }

    async addVideo(body: any, file: any, token: any) {
        try {
            const decodedVal: any = decodeUser(token);
            const creatorOfVideo = decodedVal.payload.userId;
            const urlOfVideo = process.env.VIDEO_FILE_GET_URL as string + file;
            const videoId = v4();
            const newVideo = await this.videoModel.create({
                videoId,
                ...body,
                creatorOfVideo,
                urlOfVideo
            });
            return newVideo;
        } catch (error) {
            console.log("Error occurred in add video service: ", error);
        }
    }
    async getAllVideos() {
        try {
            const allVideos = await Video.findAll({
                attributes: [
                    'titleOfVideo',
                    'descriptionOfVideo',
                    'urlOfVideo'
                ]
            });
            return allVideos
        } catch (error) {
            console.log("Error occurred in get all video service: ", error);
        }
    }

    async getSingleVideo(videoId: any) {
        try {
            const getSingleVideo = await Video.findOne({
                where: { videoId },
                attributes: [
                    'titleOfVideo',
                    'descriptionOfVideo',
                    'urlOfVideo'
                ]
            })
            return getSingleVideo;
        } catch (error) {
            console.log("Error occurred in get all video service: ", error);
        }
    }

    async editVideo(videoId: any, data: any) {
        try {
            const response = await Video.update(
                { ...data },
                { where: { videoId } }
            );
            if (response[0]) return 1;
            else return 0;
        } catch (error) {
            console.log("Error occurred in get all video service: ", error);
        }
    }

    async deleteVideo(videoId:any){
        try {
            const response = await Video.destroy(
                { where: { videoId } }
            );
            if (response[0]) return 1;
            else return 0;
        } catch (error) {
            console.log("Error occurred in get all video service: ", error);
        }
    }
}

export default VideoService;