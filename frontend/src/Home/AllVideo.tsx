import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import callAPIOnButtonClick from "../api/CallAPI";
import VideoCard from "../Components/Card";
import NavBar from "../Components/NavBar";

const AllVideo = () => {
  const [videosState, setVideosState] = useState({
    videos: [],
    message: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) navigate("/");
    const headers = {
      authorization: token,
    };
    callAPIOnButtonClick(
      "GET",
      "http://localhost:4000/api/video/allVideos",
      {},
      headers
    )
      .then((responseFromBackend: any) => {
        const { statusFromBackend, dataFromBackend }: any = responseFromBackend;
        if (statusFromBackend === 200)
          setVideosState({ message: "", videos: dataFromBackend.videos });
        else setVideosState({ message: dataFromBackend.message, videos: [] });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <div style={styles.cardContainer}>
        {videosState.videos.length === 0 ? (
          <h1>{videosState.message}</h1>
        ) : (
          videosState.videos.map((video: any, index: any) => (
            <VideoCard
              key={index}
              videoId={video.videoId}
              title={video.titleOfVideo}
              description={video.descriptionOfVideo}
              url={video.urlOfVideo}
            />
          ))
        )}
      </div>
    </>
  );
};

const styles = {
  header: {
    margin: "20px 0",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
};

export default AllVideo;
