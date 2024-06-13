import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import callAPIOnButtonClick from "../api/CallAPI";
import TextInput from "../Components/TextInput";

const EditVideo = () => {
  const navigate: any = useNavigate();
  const params = useParams();
  const [videoState, setVideoState] = useState({
    videoId: "",
    videoTitle: "",
    videoDescription: "",
  });
  const token = localStorage.getItem("token");
  const headers = {
    authorization: token,
  };

  useEffect(() => {
    callAPIOnButtonClick(
      "GET",
      `http://localhost:4000/api/video/${params.videoId}`,
      {},
      headers
    )
      .then((responseFromBacked: any) => {
        const { statusFromBackend, dataFromBackend } = responseFromBacked;
        if (statusFromBackend == 200) {
          setVideoState({
            videoId: dataFromBackend.video.videoId,
            videoTitle: dataFromBackend.video.titleOfVideo,
            videoDescription: dataFromBackend.video.descriptionOfVideo,
          });
        }
      })
      .catch((err) =>
        console.log("Error occurred in getting single video:", err)
      );
  }, []);

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setVideoState({
      ...videoState,
      [name]: value,
    });
  };

  const propsArray = [
    {
      type: "text",
      placeholder: "Enter Title",
      name: "videoTitle",
      value: videoState.videoTitle,
      onChange: onChangeHandler,
    },
    {
      placeholder: "Enter description",
      name: "videoDescription",
      value: videoState.videoDescription,
      onChange: onChangeHandler,
      isTextBox: true,
      row: 5,
      column: 5,
    },
  ];

  const callVideoEditAPIFunction = async () => {
    try {
      const response = await callAPIOnButtonClick(
        "PUT",
        `http://localhost:4000/api/video/edit/${params.videoId}`,
        {
          titleOfVideo: videoState.videoTitle,
          descriptionOfVideo: videoState.videoDescription,
        },
        headers
      );
      const status = response?.statusFromBackend;
      if (status == 200) navigate("/home");
    } catch (error) {
      console.log("Error occurred in editing single video:", error);
    }
  };

  return (
    <>
      <div className="card-outer">
        <div className="card">
          <h2>Edit Video</h2>
          {propsArray.map((val: any, index: any) => (
            <TextInput
              key={index}
              type={val.type}
              name={val.name}
              placeholder={val.placeholder}
              value={val.value}
              onChange={val.onChange}
              isTextBox={val.isTextBox}
              row={val.row}
              cols={val.column}
            />
          ))}
          <button type="submit" onClick={callVideoEditAPIFunction}>
            Edit Video
          </button>
        </div>
      </div>
    </>
  );
};

export default EditVideo;
