import * as React from "react";
import { useState, useRef,useEffect } from "react";
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
import { autocompleteClasses } from "@mui/material";

interface Props {}
export default function UserId() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

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

  const handleLogOut = () => {
    Cookies.remove("userData");
    navigate(`/`);
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

  useEffect(()=>{
    const handlBeforeUnload = ()=>{
      Cookies.remove("userData");
      localStorage.removeItem("userData");
    };
    window.addEventListener("beforeunload",handlBeforeUnload);
    return()=>{
      window.removeEventListener("beforeunload",handlBeforeUnload);
    };
  },[]);

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
