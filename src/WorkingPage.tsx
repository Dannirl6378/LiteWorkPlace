import React from "react";
import { useLocation } from "react-router-dom";
import Clock from "./1stBanner/clock";
import "./App.css";
import "./WorkingPage.css";
import AlarmClock from "./1stBanner/ReminderClock/clockRemind";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import UserId from "./1stBanner/UserId";
import NewsTabs from "./banner1/newsTabs";

export default function WorkingPage() {
  /*const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const singParam = searchParams.get("sing");*/
  //const singFromQuery = singParam === "true";

  const userDataString = Cookies.get("userData");
  console.log("userDataString", userDataString);

  if (!userDataString) {
    const isLoggedIn = false;
    console.log("isLoggedIn", isLoggedIn);
    return (
      <div className="backgroundSite">
        <div className="errorSing">
          <Link to="/">
            <Button variant="contained">Přihlášení neproběho úspěšně</Button>
          </Link>
        </div>
      </div>
    );
  }

  const userData = JSON.parse(userDataString);
  const isLoggedIn = userData.loggedIn;

  console.log("isLoggedIn", isLoggedIn);
  console.log("userDataName", userData);
  return (
    <>
      {isLoggedIn ? (
        <div className="app">
          <div className="skelet">
            <div className="componentsHead">
              <div className="banner0">
                <Clock />
                <div id="Alarm">
                  <AlarmClock />
                </div>
                <div id="UserId">
                  <UserId />
                </div>
              </div>
              <div className="newsbanner"><NewsTabs/></div>
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
        <div className="backgroundSite">
          <div className="errorSing">
            <Link to="/">
              <Button variant="contained">Přihlašení neproběho úspěšně</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
