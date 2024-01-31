import React, { useRef } from "react";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./Sing.css";
import { Tooltip } from "@mui/material";
import ValidationPassword from "./CheckPassword/ValidationPassword";
import ValidationEmail from "./CheckEmail/ValidationEmail";
import PopUp from "../PopUp/PopUp";
import CheckDatabaseEmail from "./CheckEmail/CheckDatabase";
import FindUser from "../findUser/FindUser";
import { handleRegistration } from "./Register";
import { handleSignIn } from "./SingIn";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sing() {
  const [action, setAction] = useState("Sing In");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [validationResultPassword, setValidationResultPassword] =
    useState(false);
  const [validationResultEmail, setValidationResultEmail] = useState(false);
  const [checkIsEmail, setCheckIsEmail] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (e: { target: { value: any } }) => {
    const newPwd = e.target.value;
    setPwd(newPwd);
    console.log("newPwd", newPwd, pwd);
    setValidationResultPassword(false);
  };
  const handleChangeEmail = (e: { target: { value: any } }) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidationResultEmail(false);
  };

  console.log("email", validationResultEmail);
  console.log("Password", validationResultPassword);

  const find = FindUser;
  console.log(find);

  return (
    <div className="background">
      <div className="form">
        <Box
          sx={{
            maxWidth: "fit-content",
            maxHeight: "fit-content",
            justifyContent: "center",
            margin: "5% auto",
            boxShadow: 3,
            borderRadius: 4,
            background: " #CDD1CD",
            backgroundColor: "rgb(255 255 255 / 0.6)",
            padding: "0em 2em 2em 2em",
            backdropFilter: " blur(1px)",
          }}
        >
          {action === "Sing Up" ? (
            <h1>Sing Up</h1> /*tady bude info pro heslo */
          ) : (
            <h1>Sing In</h1>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row",
            }}
          >
            <Person2OutlinedIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="inputName"
              label="Name"
              type="text"
              variant="standard"
              onChange={(e) => setUser(e.target.value)}
            />
            <CheckIcon color="success" sx={{ display: user ? "" : "none" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row",
            }}
          >
            <EmailOutlinedIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <Tooltip title="exapmle@example.com" arrow>
              <TextField
                id="inputEmail"
                label="Email"
                type="email"
                variant="standard"
                onChange={handleChangeEmail}
              />
            </Tooltip>
            <ValidationEmail
              value={{ email }}
              setValidationChangeEmail={setValidationResultEmail}
            />
            <CheckDatabaseEmail
              value={{ email }}
              setCheckIsEmail={setCheckIsEmail}
            />
            {action === "Sing Up" ? (
              <>
                <ClearIcon
                  color="error"
                  sx={{
                    display:
                      validationResultEmail && !checkIsEmail ? "none" : "",
                  }}
                />
                <CheckIcon
                  color="success"
                  sx={{
                    display:
                      validationResultEmail && !checkIsEmail ? "" : "none",
                  }}
                />
                {checkIsEmail ? <PopUp checkIsEmail={checkIsEmail} /> : ""}
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              padding: "3px 0em 1em 0em",
              flexDirection: "row",
            }}
          >
            <LockOutlinedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <Tooltip title="8 znaku velká,malá písmena a číslice" arrow>
              <TextField
                id="inputPassword"
                type="password"
                label="Password"
                value={pwd}
                variant="standard"
                onChange={handleChangePassword}
              />
            </Tooltip>
            <ValidationPassword
              value={{ pwd }}
              setValidationChangePassword={setValidationResultPassword}
            />
            <ClearIcon
              color="error"
              sx={{ display: validationResultPassword ? "none" : "" }}
            />
            <CheckIcon
              color="success"
              sx={{ display: validationResultPassword ? "" : "none" }} //tady v podmince bude kontrola podminek pro email
            />
          </Box>
          {action === "Sing Up" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "0em 0em 1em ",
                  flexDirection: "row",
                }}
              >
                <LockOutlinedIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="inputConfirmPassword"
                  label="ConfirmPassword"
                  variant="standard"
                  type="password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                />
                {pwd === matchPwd ? (
                  <CheckIcon
                    color="success"
                    sx={{ display: matchPwd ? "" : "none" }}
                  />
                ) : (
                  <ClearIcon color="error" />
                )}
              </Box>
            </>
          ) : (
            ""
          )}
          {matchPwd === pwd &&
          validationResultEmail &&
          validationResultPassword &&
          user &&
          action === "Sing Up" ? (
            <Button
              sx={{ width: "100%", padding: "10px 10px 10px 10px" }}
              variant="contained"
              onClick={() => {
                handleRegistration(user, email, pwd);
              }} //toto je registrace
            >
              Confirm
            </Button>
          ) : (
            <></>
          )}
          {pwd !== "" &&
          validationResultEmail &&
          validationResultPassword &&
          user &&
          action === "Sing In" ? (
            <Button
              sx={{ width: "100%", padding: "10px 10px 10px 10px" }}
              variant="contained"
              onClick={async () => {
                const isValid = await handleSignIn(user, email, pwd,navigate);
                if (isValid) {
                  // window.location.href = "/workingPage";
                  //redirect("/workingPage");
                  console.log("probiha prihlašeni")
                } else {
                  console.error("Incorrect login details");
                }
              }} //tady po kliknuti uloženi do databaze a přihlasi se pozor je pro sing
            >
              Confirm
            </Button>
          ) : (
            <></>
          )}
          <Stack
            spacing={2}
            direction="row"
            justifyContent={"space-evenly"}
            sx={{ padding: "1em 0em 0em 0em" }}
          >
            <Button
              variant="contained"
              disabled={action === "Sing Up" ? true : false}
              onClick={() => {
                setAction("Sing Up");
              }}
            >
              Registration
            </Button>
            <Button
              variant="contained"
              color={action === "Sing Up" ? "primary" : "primary"}
              disabled={action === "Sing Up" ? false : true}
              onClick={() => {
                setAction("Sing In");
                setMatchPwd("");
                setPwd("");
              }}
            >
              Sing In
            </Button>
            <Link to="workingPage">
              <Button variant="contained">Main Page</Button>
            </Link>
          </Stack>
        </Box>
      </div>
    </div>
  );
}
