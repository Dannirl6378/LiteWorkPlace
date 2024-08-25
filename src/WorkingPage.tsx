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
import NewsTabs from "./bannerNews/newsTabs";
import Radio from "./bannerRadio/radio";
import MyCalender from "./bannerCalender/MyCalender/MCalender";
import ToDoList from "./bannerTODoLIST/ToDoListMain";
import TextEdit from "./bannerTextEdit/TextEditMain";


export default function WorkingPage() {
  /*const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const singParam = searchParams.get("sing");*/
  //const singFromQuery = singParam === "true";

  const getuserDataString = () => {
    return Cookies.get("userDatas");
  };

  const userDataString=getuserDataString();


  console.log("userDataString", userDataString);

  if (!userDataString) {
    //const isLoggedIn = false;
    //console.log("isLoggedIn", isLoggedIn);
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

  let userData;
  try {
    userData = JSON.parse(userDataString);
    console.log("Parsed user data:", userData);
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  const isLoggedIn = userData?.loggedIn ?? false;

  console.log("Is logged in:", isLoggedIn);

  //const userData = JSON.parse(userDataString);
  //const isLoggedIn = userData.loggedIn;

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
              <div className="newsbanner">
                <NewsTabs />
              </div>
            </div>
            <div className="componentsBody">
              <div className="leftSide">
                <div className="banner1Td"><ToDoList/> </div>
                <div className="banner2Calender">
                  <MyCalender />
                </div>
              </div>
              <div className="banner3Notes"><TextEdit/></div>
              <div className="rightSide">
                <div className="banner4OneNote">OneNote</div>
                <div className="banner5Radio">
                  <Radio />
                </div>
                <div className="banner6MiniGame">MiniGame</div>
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
