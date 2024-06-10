import { Router, Request, Response } from "express";
import authorization from "../middleware/Authenticate";
import { uploadVideo } from "../middleware/Upload";
import VideoController from "../controller/Video";
const videoRouter = Router();

videoRouter.get("/allVideos",authorization, async (req: Request, res: Response) => {
    try {
        const videoController = new VideoController(req,res);
        await videoController.getAllVideos();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

videoRouter.get("/:videoId",authorization,async (req: Request, res: Response)=>{
    try {
        const videoController = new VideoController(req,res);
        await videoController.getSingleVideo();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

videoRouter.post("/addVideo", [authorization, uploadVideo], async (req: Request, res: Response) => {
    try {
        const videoController = new VideoController(req,res);
        await videoController.addVideo();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

videoRouter.put("/edit/:videoId",authorization,async(req:Request,res:Response)=>{
    try {
        const videoController = new VideoController(req,res);
        await videoController.editVideo();
    } catch (error) {
        console.log("Global Error :", error);
    }
})
videoRouter.put("/delete/:videoId",authorization,async(req:Request,res:Response)=>{
    try {
        const videoController = new VideoController(req,res);
        await videoController.deleteVideo();
    } catch (error) {
        console.log("Global Error :", error);
    }
})

export default videoRouter