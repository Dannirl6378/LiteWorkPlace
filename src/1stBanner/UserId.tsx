import * as React from "react";
import { useState, useRef, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useNavigate } from "react-router-dom";
import { updateUserData, fetchUserData } from "../dbData/PushGetData";
import Profile from "../Profile/Profile";


// Definice typu pro uživatelská data
interface UserData {
  name: string;
  email: string;
  loggedIn: boolean;
}

interface UserIdProps {
  quillContent: string;
  ToDoList: string[];
  callenAction: string;
  setQuillContent: (content: string) => void;
  setToDoList: (list: string[]) => void;
  setCalenAction: (action: string) => void; 
}

export default function UserId({ quillContent,
  ToDoList,
  callenAction,
  setQuillContent,
  setToDoList,
  setCalenAction, }: UserIdProps) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Předpokládaná událost a úkoly
  const Calander= callenAction;
  const ToDo= ToDoList;
  const quill = quillContent;

  const userDataString = sessionStorage.getItem("userDatas");

  useEffect(() => {
    if (userDataString) {
      try {
        // Parsování stringu na objekt
        const parsedUserData = JSON.parse(userDataString) as UserData;
        setUserData(parsedUserData);

  
        // Načtení dat
        const fetchData = async () => {
          const fetchedData = await fetchUserData(parsedUserData.email);
          if (fetchedData) {
            setQuillContent(fetchedData.Quilltext || "");
            setToDoList(fetchedData.todoList || []);
            setCalenAction(fetchedData.akceCalander || "");
          }
        };

        fetchData();
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.log("No user data found.");
    }
  }, [userDataString, setQuillContent, setToDoList, setCalenAction]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleLogOut = async () => {
    try {
      if (userData) {
        // Uložení obsahu před odhlášením
        await updateUserData(userData.email, Calander, quill, ToDo);
      }
      navigate(`/`);
    } catch (error) {
      console.error("Error during logout and data saving:", error);
    }
  };

  const handleClickProfil = () => {
    navigate(`/MyProfile`);
  };
  const handleProfile = ()=>{
    navigate(`/Profile`);
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("userDatas"); // Ujistěte se, že název localStorage položky je správný
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <Button
        sx={{
          color: "black",
          "& .MuiSvgIcon-root": {
            width: "max(20px, min(55px, 5vw))",
            height: "max(20px, min(55px, 5vw))",
          },
        }}
        startIcon={<AccountCircleIcon />}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      ></Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleClickProfil}>My CV</MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
