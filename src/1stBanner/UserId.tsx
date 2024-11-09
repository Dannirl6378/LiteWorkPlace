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
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { updateUserData, fetchUserData } from "../dbData/PushGetData";
import ToDoList from "../bannerTODoLIST/ToDoListMain";

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
}

export default function UserId({ quillContent, ToDoList, callenAction }: UserIdProps) {
  const [open, setOpen] = useState(false);
  const [quillText, setQuillText] = useState<string>();
  const [toDoListData,setToDoListData]=useState<string[]>();
  const [akceCalender, setAkceCalender]=useState<string>(callenAction);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Předpokládaná událost a úkoly
  const Calander= callenAction;
  const ToDo= ToDoList;
  const quill = quillContent;

  console.log("callen",callenAction, Calander);
  console.log("todoList",ToDo,callenAction);
  console.log("data", ToDo, quill,Calander );
  const userDataString = sessionStorage.getItem("userDatas");

  useEffect(() => {
    if (userDataString) {
      try {
        // Parsování stringu na objekt
        const parsedUserData = JSON.parse(userDataString) as UserData;
        setUserData(parsedUserData);
        console.log("Parsed user data:", parsedUserData);
  
        // Načtení dat
        fetchUserData(parsedUserData.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.log("No user data found.");
    }
  }, []);

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

      Cookies.remove("userDatas"); // Ujistěte se, že název cookie je správný
      navigate(`/`);
    } catch (error) {
      console.error("Error during logout and data saving:", error);
    }
  };

  const handleClickProfil = () => {
    navigate(`/MyProfile`);
  };

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
      Cookies.remove("userDatas"); // Ujistěte se, že název cookie je správný
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
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
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
