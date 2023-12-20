// Home.js
import React, { createContext, useState } from "react";
import TopView from "./TopView";
import HomeContext from "./HomeContext";

const Home = () => {
  const [state, setState] = useState({ name: "charan" });
  return (
    <HomeContext.Provider value={state}>
      <div>
        <TopView />
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
