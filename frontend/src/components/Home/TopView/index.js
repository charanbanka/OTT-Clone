import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import HomeContext from "../HomeContext";

const TopView = () => {
  const backgroundImageUrl =
    "http://localhost:8000/images/image/44dfb8a6-344d-4ef6-8ca7-0bf8620ba5c1";
  const styles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "700px", // Set the desired height
    // Add more styling as needed
    width: "100%",
  };

  return (
    <div style={styles}>
      <img width="100%" src={backgroundImageUrl} />
    </div>
  );
};

export default TopView;
