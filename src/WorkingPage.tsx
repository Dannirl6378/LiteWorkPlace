import React from "react";
import { useLocation } from "react-router-dom";
import Clock from "./1stBanner/ReminderClock/clock";
import "./App.css";
//import PopUp from "./PopUp/PopUp";
import "./WorkingPage.css";
import AlarmClock from "./1stBanner/ReminderClock/clockRemind";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function WorkingPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const singParam = searchParams.get("sing");
  const singFromQuery = singParam === "true";

  return (
    <>
      {singFromQuery ? (
        <div className="app">
          <div className="skelet">
            <div className="componentsHead">
              <div className="banner0">
                <Clock />
                <div id="Alarm">
                  <AlarmClock />
                </div>
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
        <Link to="/">
          <Button variant="contained">LogIn</Button>
        </Link>
      )}
    </>
  );
}

export default WorkingPage;
