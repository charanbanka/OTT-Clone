import React, { useEffect, useRef, useState } from "react";
import config from "../../config";

const VideoPlayer = ({ id }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  });

  return (
    <video ref={videoRef} width="100%" height="100%" autoPlay>
      <source
        src={`${config.baseUrl}/videos/video/${id}`}
        type="video/mp4"
      ></source>
      Your doesn't support the video
    </video>
  );
};

export default VideoPlayer;
