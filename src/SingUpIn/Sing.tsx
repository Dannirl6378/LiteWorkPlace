import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
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
import { Alert, AlertTitle, Tooltip, useMediaQuery } from "@mui/material";
import ValidationPassword from "./CheckPassword/ValidationPassword";
import ValidationEmail from "./CheckEmail/ValidationEmail";
import PopUp from "../PopUp/PopUp";
import CheckDatabaseEmail from "./CheckEmail/CheckDatabase";
import { handleRegistration } from "./Register";
import { handleSignIn } from "./SingIn";
import { useNavigate } from "react-router-dom";
import { getUser } from "../dbData/AxiosGetUserbyEmail";

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

  const handleSignInClick = async () => {
    const isValid = await handleSignIn(email, pwd, navigate);
    const getName = await getUser(email);
    setUser(getName.name);
    if (isValid.success) {
      const userData = {
        name: `${getName.name}`,
        email: `${email}`,
        loggedIn: isValid.success,
      };
      sessionStorage.setItem("userDatas", JSON.stringify(userData));
    } else {
      const userData = { loggedIn: isValid.success };
      sessionStorage.setItem("userDatas", JSON.stringify(userData));
      navigate("/workingPage");
      console.error("Nesprávné přihlašovací údaje");
    }
  };

  const handleChangePassword = (e: { target: { value: any } }) => {
    const newPwd = e.target.value;
    setPwd(newPwd);
    setValidationResultPassword(false);
  };
  const handleChangeEmail = (e: { target: { value: any } }) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidationResultEmail(false);
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  

  return (
    <>
      <div className="background">
        <div className="form">
          <Box
            sx={{
              maxWidth: "fit-content",
              maxHeight: "fit-content",
              justifyContent: "center",
              margin: "15% auto",
              boxShadow: 3,
              borderRadius: 4,
              background: " #CDD1CD",
              backgroundColor: "rgb(255 255 255 / 0.6)",
              padding: "0em 2em 2em 2em",
              backdropFilter: " blur(1px)",
              "@media (max-width: 768px)": {
                margin: "55% auto",
              },
              "@media (max-width: 853px)": {
                margin: "45% auto",
              },
              "@media (max-width: 375px)": {
                margin: "60% auto",
              },
            }}
          >
            {action === "Sing Up" ? <h1>Sign Up</h1> : <h1>Sign In</h1>}
            {action === "Sing Up" ? (
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
                <CheckIcon
                  color="success"
                  sx={{ display: user ? "" : "none" }}
                />
              </Box>
            ) : null}
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
              {action === "Sing In" ? (
                <>
                  {/* Kontrola formátu e-mailu při přihlášení */}
                  <CheckIcon
                    color="success"
                    sx={{
                      display: validationResultEmail ? "" : "none", // Fajfka, pokud je formát správný
                    }}
                  />
                  <ClearIcon
                    color="error"
                    sx={{
                      display: !validationResultEmail ? "" : "none", // Křížek, pokud je formát nesprávný
                    }}
                  />
                </>
              ) : action === "Sing Up" ? (
                <>
                  {/* Kontrola formátu e-mailu a existence v databázi při registraci */}
                  <ClearIcon
                    color="error"
                    sx={{
                      display:
                        !validationResultEmail || checkIsEmail ? "" : "none", // Křížek, pokud formát není správný nebo e-mail existuje v databázi
                    }}
                  />
                  <CheckIcon
                    color="success"
                    sx={{
                      display:
                        validationResultEmail && !checkIsEmail ? "" : "none", // Fajfka, pokud je formát správný a e-mail neexistuje
                    }}
                  />
                  {checkIsEmail && <PopUp checkIsEmail={checkIsEmail} />}
                </>
              ) : null}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                padding: "3px 0em 1em 0em",
                flexDirection: "row",
              }}
            >
              <LockOutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <Tooltip
                title="8 znaku velká,malá písmena a číslice"
                arrow
                disableHoverListener={isMobile} // Na mobilech vypne hover
                disableTouchListener={false} // Povolit touch (kliknutí)
                disableFocusListener={false} // Povolit focus (po kliknutí)
              >
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
            action === "Sing In" ? (
              <Button //toto je !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! přihlašení
                sx={{ width: "100%", padding: "10px 10px 10px 10px" }}
                variant="contained"
                onClick={handleSignInClick} //tady po kliknuti přihlasi se pozor je pro sing
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
                Sign In
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
      <Box sx={{ mt: 0, mx: "auto", maxWidth: 600 }}>
        <Alert severity="info">
          <AlertTitle>Důležité informace</AlertTitle>
          Tento web je pouze demonstrační. Žádné osobní údaje nejsou ukládány.
          Registrace je pouze simulace a není nutné zadávat skutečný e-mail a
          jine informace. Ukládaní Todo List, Kalendář, Text Edit. je až po
          odhlašení. Server při nečinosti má prodlevu 50s.
        </Alert>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </>
  );
}
