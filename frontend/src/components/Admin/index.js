import React, { useState } from "react";
import "./admin.css";
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
        <div className="admin-tabs">
          {tabs.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => setTab(item.key)}
                // className="tab-label text-green"
                className={`tab-label ${
                  item.key == tab && "text-green border-green"
                }`}
              >
                {" "}
                {item.label}
              </div>
            );
          })}
        </div>
        <div className="admin-tabs-content">
          {tab == "movie" && <AdminMovie />}
          {tab == "image" && <AdminImage />}
          {tab == "video" && <AdminVideo />}
        </div>
      </div>
    </AdminContext.Provider>
  );
};

export default Admin;
