import React, { useState } from "react";
import AdminMovie from "./AdminMovie";
import AdminContext from "../Context/AdminContext";
import AdminImage from "./AdminImage";
import AdminVideo from "./AdminVideo";

const Admin = () => {
  const tabs = [
    { label: "Movie", key: "movie" },
    { label: "Image", key: "image" },
    { label: "Video", key: "video" },
  ];
  const [tab, setTab] = useState("movie");

  return (
    <AdminContext.Provider>
      <div className="admin-container">
        <div className="admin-tabs flex">
          {tabs?.map((item) => (
            <div
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`cursor-pointer py-2 px-4 mr-2 rounded ${
                item.key === tab ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="admin-tabs-content">
          {tab === "movie" && <AdminMovie />}
          {tab === "image" && <AdminImage />}
          {tab === "video" && <AdminVideo />}
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default Admin;
