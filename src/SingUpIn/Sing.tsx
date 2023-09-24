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
import ValidationPassword from "./ValidationPassword";
import ValidationEmail from "./ValidationEmail";

interface ValidationResult {
  email: string;
  pwd:string;

}

export default function Sing() {
  const [action, setAction] = useState("Sing In");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [validationResultPassword, setValidationResultPassword] = useState(false);
  const [validationResultEmail, setValidationResultEmail] = useState(false);

  // Funkce pro aktualizaci stavu validationResultPasswod
 /* const handleValidationChangePassword = (
    validationResultPassword:ValidationResult
  ) => {
    setValidationResultPassword(validationResultPassword);
  };*/
  const handleChangeEmail=(e: { target: { value: any; }; })=>{
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidationResultEmail(false);
   // <ValidationEmail value={{email}} setValidationChangeEmail={setValidationResultEmail}/>
  }

      console.log(handleChangeEmail)

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
                //helperText="exapmle@example.com"
                variant="standard"
                onChange={handleChangeEmail}
              />
            </Tooltip>
            <ValidationEmail
              value={{email}}
              setValidationChangeEmail={setValidationResultEmail}
            />
            {action === "Sing Up" ? (
              <CheckIcon
                color="success"
                sx={{ display: validationResultEmail ? "" : "none" }} //tady v podmince bude kontrola podminek pro email
              />
            ) : (
              <></>
            )}
            {/* <ValidationEmail value={{ email }} onValidationChange={function (validationResults: { email: boolean; }): void {
              throw new Error("Function not implemented.");
            } }/>*/}
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
                //helperText={action==="Sing Up"?"8 znaku velká,malá písmena a číslice":<></>}
                value={pwd}
                variant="standard"
                onChange={(e) => setPwd(e.target.value)}
              />
            </Tooltip>
            <ValidationPassword
              value={{ pwd }}
              onValidationChangePassword={() => {
                setValidationResultPassword(validationResultPassword);
              }}    
            />
            <CheckIcon
              color="success"
              sx={{ display: validationResultPassword ? "" : "none" }} //tady v podmince bude kontrola podminek pro heslo
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
          {matchPwd === pwd && email && user && action === "Sing Up" ? (
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
          {pwd !== "" && email && user && action === "Sing In" ? (
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
