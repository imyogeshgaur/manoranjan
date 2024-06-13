import React from "react";
import { useNavigate } from "react-router";
import callAPIOnButtonClick from "../api/CallAPI";

const VideoCard = ({ title, description, url, videoId }: any) => {
  const navigate = useNavigate();

  const navigateToEditPage = () => {
    navigate(`/edit/${videoId}`);
  };
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };

  const callVideoDeleteAPIFunction = async () => {
    try {
      const response = await callAPIOnButtonClick(
        "DELETE",
        `http://localhost:4000/api/video/delete/${videoId}`,
        {},
        headers 
      );
      const status = response?.statusFromBackend;
      if (status === 200) window.location.reload()
    } catch (error) {
      console.log("Error occurred in editing single video:", error);
    }
  };
  return (
    <div className="videoCard">
      <video src={url} className="videoPlayer" controls={true}></video>
      <h3 style={{ marginLeft: "1rem" }}>{title}</h3>
      <p style={{ marginLeft: "1rem" }}>{description}</p>
      <button className="edit-button" onClick={navigateToEditPage}>
        <i
          className="fa-solid fa-edit"
          style={{ fontSize: "2rem", color: "#1e2496" }}
        />
      </button>
      <button className="delete-button" onClick={callVideoDeleteAPIFunction}>
        <i
          className="fa-solid fa-trash"
          style={{ fontSize: "2rem", color: "red" }}
        />
      </button>
    </div>
  );
};

export default VideoCard;
