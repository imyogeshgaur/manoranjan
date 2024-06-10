import React, { useState } from "react";
import { useNavigate } from "react-router";
import callAPIOnButtonClick from "../api/CallAPI";
import TextInput from "../Components/TextInput";
import { v4 } from "uuid";

const AddVideo = () => {
  const navigate: any = useNavigate();
  const [videoState, setVideoState] = useState<any>({
    videoId: v4(),
    videoTitle: "",
    videoDescription: "",
    videoToUpload: "",
  });

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setVideoState({
        ...videoState,
        videoToUpload: selectedFile,
      });
    }
  };

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
    {
      type: "file",
      placeholder: "Select file to upload",
      name: "videoToUpload",
      value: videoState.videoToUpload,
      onChange: handleFileChange,
    },
  ];

  const callVideoUploadAPIFunction = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("videoId", videoState.videoId);
      formData.append("titleOfVideo", videoState.videoTitle);
      formData.append("descriptionOfVideo", videoState.videoDescription);
      formData.append("videoToUpload", videoState.videoToUpload);
      const headers = {
        authorization: token,
      };
      const responseFromBackend = await callAPIOnButtonClick(
        "POST",
        "http://localhost:4000/api/video/addVideo",
        {},
        headers,
        formData,
        true
      );
      if(responseFromBackend?.statusFromBackend==200){
        navigate("/home")
      }
    } catch (error) {
      console.log("Error in uploading video: ", error);
    }
  };
  return (
    <>
      <div className="card-outer">
        <div className="card">
          <h2>Upload Video</h2>
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
          <button type="submit" onClick={callVideoUploadAPIFunction}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddVideo;
