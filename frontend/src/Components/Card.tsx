import React from "react";
import { useNavigate } from "react-router";

const VideoCard = ({ title, description, url, videoId }: any) => {
  const navigate = useNavigate();

  const navigateToEditPage = () => {
    navigate(`/edit/${videoId}`);
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
      <button className="delete-button" a-key={2}>
        <i
          className="fa-solid fa-trash"
          style={{ fontSize: "2rem", color: "red" }}
        />
      </button>
    </div>
  );
};

export default VideoCard;
