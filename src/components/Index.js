import React from "react";
import NavBar from "../features/navbar";
import Menu from "../features/menu";
import Main from "../features/main";


function Index() {
  return (
    <div>
      <NavBar />
      <div className="icerik">
        <Menu />
        <Main/>
      </div>
    </div>
  );
}

export default Index;
