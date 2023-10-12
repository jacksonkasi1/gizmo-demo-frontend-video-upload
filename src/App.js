import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoData, setVideoData] = useState({});

  // const baseUrl = "http://localhost:5000";
  const baseUrl = "http://13.232.232.117:5000";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await axios.post(
        `${baseUrl}/user/upload-video`,
        formData,
        {
          params: {
            user_id: "your_user_id", // Replace with the actual user id
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        setVideoData(response.data);
      } else {
        alert("Failed to upload video: " + response.data.message);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video");
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadProgress > 0 && <div>Upload progress: {uploadProgress}%</div>}
      <hr />
      <code>{JSON.stringify(videoData)}</code>
    </div>
  );
}

export default App;
