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
import { Link } from "react-router-dom";
import "./Sing.css";

export default function Sing() {
  const [action, setAction] = useState("Sing In");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="background">
      <div className="form">
        <Box
          sx={{
            maxWidth: "fit-content",
            maxHeight: "fit-content",
            justifyContent: "center",
            margin: "5% auto",
            boxShadow: 5,
            borderRadius: 4,
            background: " #CDD1CD",
            padding: "0em 2em 2em 2em",
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
            <TextField
              id="inputEmail"
              label="Email"
              type="email"
              helperText="exapmle@example.com"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CheckIcon
              color="success"
              sx={{ display: email ? "" : "none" }} //tady v podmince bude kontrola podminek pro email
            />
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
            <TextField
              id="inputPassword"
              type="password"
              label="Password"
              helperText={action==="Sing Up"?"8 znaku velká,malá písmena a číslice":<></>}
              value={pwd}
              variant="standard"
              onChange={(e) => setPwd(e.target.value)}
            />
            <CheckIcon
              color="success"
              sx={{ display: pwd ? "" : "none" }} //tady v podmince bude kontrola podminek pro heslo
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
          {matchPwd === pwd && email && user ? (
            <Button
              sx={{ width: "100%", padding: "10px 10px 10px 10px" }}
              variant="contained"
              onClick={() => {}} //tady po kliknuti uloženi do databaze a vyhodi to popUp s dokončenou registraci
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
            {/*<Link to="workingPage">
              <Button variant="contained">Main Page</Button>
            </Link>*/}
          </Stack>
        </Box>
      </div>
    </div>
  );
}
