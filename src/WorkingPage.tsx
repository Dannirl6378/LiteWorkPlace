import React from "react";
import { useState } from "react";
import Clock from "./1stBanner/clock";
import "./App.css";
import "./WorkingPage.css";
import AlarmClock from "./1stBanner/ReminderClock/clockRemind";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import UserId from "./1stBanner/UserId";
import NewsTabs from "./bannerNews/newsTabs";
import Radio from "./bannerRadio/radio";
import TextEdit from "./bannerTextEdit/TextEditMain";
import TicTacToe from "./bannerMinigame/TicTacToe";
import Weather from "./bannerWeather/Weather";
import ToDoList from "./bannerTODoLIST/ToDoListMain";
import MCalender from "./bannerCalender/MyCalender/MCalender";

export default function WorkingPage() {
  const [quillContent, setQuillContent] = useState("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const getuserDataString = sessionStorage.getItem("userDatas");
  let userData;
  if (getuserDataString) {
    try {
      userData = JSON.parse(getuserDataString);
      console.log("rozdelen user data", userData);
    } catch (error) {
      console.error("chybav rodeleni dat", error);
    }
  }

  const isLoggedIn = userData?.loggedIn ?? false;

  console.log("isLogedIn", isLoggedIn);

  if (!isLoggedIn) {
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
                  <UserId quillContent={quillContent} ToDoList={todoList} />
                </div>
              </div>
              <div className="containerNewsRadio">
                <div className="newsbanner">
                  <NewsTabs />
                </div>
                <div className="banner5Radio">
                  <Radio />
                </div>
              </div>
            </div>
            <div className="componentsBody">
              <div className="leftSide">
                <div className="banner1Td">
                  <ToDoList onListChange={(items) => setTodoList(items)} />
                </div>
                <div className="banner2Calender">
                  <MCalender />
                </div>
              </div>
              <div className="banner3Notes">
                <TextEdit
                  onContentChange={(content) => setQuillContent(content)}
                />
              </div>
              <div className="rightSide">
                <div className="bannerWeather">
                  <Weather />
                </div>
                <div className="banner6MiniGame">
                  <TicTacToe />
                </div>
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
