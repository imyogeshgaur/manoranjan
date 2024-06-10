import UserService from "../service/user.service";
import VideoService from "../service/video.service";
import { Request, Response } from "express";

class VideoController {

    private req: any;
    private res: Response;
    private service: VideoService;
    constructor(request: any, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new VideoService();
    }

    async addVideo() {
        try {
            const body = this.req.body;
            const file = this.req.file?.filename;
            const token = this.req.headers.authorization;
            const video = await this.service.addVideo(body, file, token);
            if(video)return this.res.status(200).send({ message: "Video uploaded successfully !!!"});
            else return this.res.status(400).send({ message: "Some error occurred"});
        } catch (error) {
            console.log("Error occurred at forget password controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    async getAllVideos() {
        try {
            const videos = await this.service.getAllVideos();
            if (videos?.length == 0) return this.res.status(400).send({ message: "Sorry, no videos found !!!" });
            else return this.res.status(200).send({ videos });
        } catch (error) {
            console.log("Error occurred at get all Videos controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    async getSingleVideo() {
        try {
            const videoId = this.req.params.videoId;
            const video = await this.service.getSingleVideo(videoId);
            return this.res.status(200).send({ video });
        } catch (error) {
            console.log("Error occurred at get single Videos controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }
    async editVideo() {
        try {
            const videoId = this.req.params.videoId;
            const data = this.req.body;
            const response = await this.service.editVideo(videoId, data)
            if (response) return this.res.status(200).send({ message: "Video Details Updated !!!" })
            else return this.res.status(400).send({ message: "Some Error Occurred !!!" })
        } catch (error) {
            console.log("Error occurred at edit video controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }
    async deleteVideo() {
        try {
            const videoId = this.req.params.videoId;
            const response = await this.service.deleteVideo(videoId)
        } catch (error) {
            console.log("Error occurred at delete Video controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }
}

export default VideoController