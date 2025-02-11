import React from "react";
import { useState } from "react";
import Clock from "./1stBanner/clock";
import "./App.css";
import "./WorkingPage.css";
import AlarmClock from "./1stBanner/ReminderClock/clockRemind";
import { Link } from "react-router-dom";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import UserId from "./1stBanner/UserId";
import NewsTabs from "./bannerNews/newsTabs";
import Radio from "./bannerRadio/radio";
import TextEdit from "./bannerTextEdit/TextEditMain";
import TicTacToe from "./bannerMinigame/TicTacToe";
import Weather from "./bannerWeather/Weather";
import ToDoList from "./bannerTODoLIST/ToDoListMain";
import MyCalendar from "./bannerCalender/MyCalender/MCalender";
import ChuckNorrisJoke from "./bannerJokes/ChuckNorrisJokes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function WorkingPage() {
  const [quillContent, setQuillContent] = useState(""); // Změněno na DeltaStatic | string
  const [todoList, setTodoList] = useState<string[]>([]);
  const [callenAction, setCalenAction] = useState<string>("");
  const [expanded, setExpanded] = useState<string | false>(false);

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px) and (min-width:601px)");

  const getuserDataString = sessionStorage.getItem("userDatas");
  let userData;
  if (getuserDataString) {
    try {
      userData = JSON.parse(getuserDataString);
    } catch (error) {
      console.error("chybav rodeleni dat", error);
    }
  }

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const userName = userData?.name ?? false;
  const isLoggedIn = userData?.loggedIn;

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
    <div className="app">
      <div className="skelet">
        {isLoggedIn ? (
          isMobile ? (
            <div className="componentsHead">
              <div className="banner0">
                <Clock />
                <div id="Alarm">
                  <AlarmClock />
                </div>
                <div className="user-info">
                  <div id="UserId">
                    <UserId
                      quillContent={quillContent}
                      ToDoList={todoList}
                      callenAction={callenAction}
                      setQuillContent={setQuillContent}
                      setToDoList={setTodoList}
                      setCalenAction={setCalenAction}
                    />
                  </div>
                </div>
              </div>
              <div className="containerNewsRadio">
                <div className="newsbanner">
                  <ChuckNorrisJoke />
                </div>
                <div className="banner5Radio">
                  <Radio />
                </div>
              </div>
              <div className="componentsBody">
                <Accordion
                  expanded={expanded === "todo"}
                  onChange={handleChange("todo")}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>To-Do List</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ToDoList
                      onListChange={(items) => setTodoList(items)}
                      todoList={todoList}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "calendar"}
                  onChange={handleChange("calendar")}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Calendar</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <MyCalendar
                      onContentChange={(events: string) =>
                        setCalenAction(events)
                      }
                      callenAction={callenAction}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "notes"}
                  onChange={handleChange("notes")}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Notes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextEdit
                      onContentChange={(content: any) =>
                        setQuillContent(JSON.stringify(content))
                      }
                      quillContent={quillContent}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "weather"}
                  onChange={handleChange("weather")}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Weather</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Weather />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "minigame"}
                  onChange={handleChange("minigame")}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Mini Game</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TicTacToe />
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          ) : isTablet ? (
            <div className="app">
              <div className="skelet">
                <div className="componentsHead">
                  <div className="banner0">
                    <Clock />
                    <div id="Alarm">
                      <AlarmClock />
                    </div>
                    <div id="UserId">
                      <UserId
                        quillContent={quillContent}
                        ToDoList={todoList}
                        callenAction={callenAction}
                        setQuillContent={setQuillContent}
                        setToDoList={setTodoList}
                        setCalenAction={setCalenAction}
                      />
                    </div>
                  </div>
                  <div className="containerNewsRadio">
                    <div className="newsbanner">
                      <ChuckNorrisJoke />
                    </div>
                    <div className="banner5Radio">
                      <Radio />
                    </div>
                  </div>
                </div>
                <div className="componentsBody">
                  <div className="leftSide">
                    <div className="banner1Td">
                      <ToDoList
                        onListChange={(items) => setTodoList(items)}
                        todoList={todoList}
                      />
                    </div>
                    <div
                      className="calendarButton"
                      onClick={() => setExpanded("calendar")}
                    >
                      Otevřít Kalendář
                    </div>
                    <div
                      className="minigameButton"
                      onClick={() => setExpanded("minigame")}
                    >
                      Otevřít Mini hru
                    </div>
                    {expanded && (
                      <Box
                        sx={{
                          margin: "20px auto",
                          padding: "20px",
                          maxHeight:"350px",
                          maxWidth: "200px",
                          backgroundColor: "white",
                          boxShadow: 3,
                          borderRadius: 4,
                          textAlign: "center",
                        }}
                      >
                        {expanded === "calendar" && <MyCalendar onContentChange={function (content: string): void {
                            throw new Error("Function not implemented.");
                          } } callenAction={""} />}
                        {expanded === "minigame" && <TicTacToe />}
                      </Box>
                    )}
                  </div>
                  <div className="banner3Notes">
                    <TextEdit
                      onContentChange={(content: any) =>
                        setQuillContent(JSON.stringify(content))
                      }
                      quillContent={quillContent}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="app">
              <div className="skelet">
                <div className="componentsHead">
                  <div className="banner0">
                    <Clock />

                    <div id="Alarm">
                      <AlarmClock />
                    </div>
                    <h3>{userName}</h3>
                    <div id="UserId">
                      <UserId
                        quillContent={quillContent}
                        ToDoList={todoList}
                        callenAction={callenAction}
                        setQuillContent={setQuillContent}
                        setToDoList={setTodoList}
                        setCalenAction={setCalenAction}
                      />
                    </div>
                  </div>
                  <div className="containerNewsRadio">
                    <div className="newsbanner">
                      <ChuckNorrisJoke />
                    </div>
                    <div className="banner5Radio">
                      <Radio />
                    </div>
                  </div>
                </div>
                <div className="componentsBody">
                  <div className="leftSide">
                    <div className="banner1Td">
                      <ToDoList
                        onListChange={(items) => setTodoList(items)}
                        todoList={todoList}
                      />
                    </div>
                    <div className="banner2Calender">
                      <MyCalendar
                        onContentChange={(events: string) =>
                          setCalenAction(events)
                        }
                        callenAction={callenAction}
                      />
                    </div>
                  </div>
                  <div className="banner3Notes">
                    <TextEdit
                      onContentChange={(content: any) =>
                        setQuillContent(JSON.stringify(content))
                      }
                      quillContent={quillContent}
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
          )
        ) : (
          <div className="backgroundSite">
            <div className="errorSing">
              <Link to="/">
                <Button variant="contained">
                  Přihlašení neproběho úspěšně
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
