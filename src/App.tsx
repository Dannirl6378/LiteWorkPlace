import React, { useState } from "react";
import Clock from "./clock";
import Sing from "./SingUpIn/Sing";
import "./App.css";
import PopUp from "./PopUp/PopUp";

function App() {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <>
      {confirmed === true ? (
        <div className="app">
          <div className="skelet">
            <div className="componentsHead">
              <div className="banner0">
                <Clock />
              </div>
              <div className="newsbanner">test1</div>
            </div>
            <div className="componentsBody">
              <div className="leftSide">
                <div className="banner1Td">test1</div>
                <div className="banner2Calender">test1</div>
              </div>
              <div className="banner3Notes">test1</div>
              <div className="rightSide">
                <div className="banner4OneNote">test1</div>
                <div className="banner5Radio">test1</div>
                <div className="banner6MiniGame">test1</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Sing setConfirmed={setConfirmed} />
      )}
    </>
  );
}

export default App;
{
  /* <Sing setConfirmed={setConfirmed}/> <PopUp/>*/
}
