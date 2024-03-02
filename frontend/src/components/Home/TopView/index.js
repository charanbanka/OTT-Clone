import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import HomeContext from "../HomeContext";
import config from "../../../config";

const TopView = ({ image_id }) => {
  const backgroundImageUrl = `${config.baseUrl}/images/image/${image_id}`;
  const styles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%", // Set the desired height
    // Add more styling as needed
    width: "100%",
  };

  return (
    <div style={styles}>
      <img width="100%" src={backgroundImageUrl} height="100" />
    </div>
  );
};

export default TopView;
