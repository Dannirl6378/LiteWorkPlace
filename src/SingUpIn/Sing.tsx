import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import "./Sing.css";


interface SingProps {
  setConfirmed: (confirmed: boolean) => void;
}

export default function Sing(props: SingProps) {
  const [action, setAction] = useState("Sing Up");
  const [pwd,setPwd]=useState("");
  const [matchPwd,setMatchPwd]=useState("");
  const [user,setUser]=useState("");
  const [email,setEmail]=useState("");
  return (
    <div className="background">
    <div className="form">
      <Box
        sx={{
          maxWidth: "fit-content",
          maxHeight: "fit-content",
          marginTop: "15%",
          marginLeft: "35%",
          boxShadow: 5,
          borderRadius: 4,
          background: " #CDD1CD",
          padding: "0em 2em 2em 2em",
        }}
      >
        {action === "Sing Up" ? <h1>Sing Up</h1> : <h1>Sing In</h1>}

        <Box sx={{ display: "flex", alignItems: "flex-end",flexDirection:"row", }}>
          <Person2OutlinedIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField id="inputName" label="Name" variant="standard" onChange={(e) => setUser(e.target.value)} />
          <CheckIcon color="success" sx={{ display: user ? "" : "none" }}/>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end",flexDirection:"row", }}>
          <EmailOutlinedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="inputEmail" label="Email" variant="standard" onChange={(e) => setEmail(e.target.value)}/>
          <CheckIcon color="success" sx={{ display: email ? "" : "none" }}/>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            padding: "0em 0em 1em",
            flexDirection:"row",
          }}
        >
          <LockOutlinedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="inputPassword" type="password" label="Password" value={pwd} variant="standard" onChange={(e) => setPwd(e.target.value)}/>
          <CheckIcon color="success" sx={{ display: pwd ? "" : "none" }} />
        </Box>
        {action === "Sing Up" ? 
        <>
        <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              padding: "0em 0em 1em ",
              flexDirection:"row",
            }}
          >
            <LockOutlinedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="inputConfirmPassword"
              label="ConfirmPassword"
              variant="standard"
              type="password"
              onChange={(e) => setMatchPwd(e.target.value)} 
              />
              {pwd===matchPwd?<CheckIcon color="success" sx={{ display: matchPwd ? "" : "none" }}/>:<ClearIcon color="error"/>}
          </Box>
          </>
          :""}

    
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              setAction("Sing Up");
            }}
          >
            Sing Up
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAction("Sing In");
              setMatchPwd("");
            }}
          >
            Sing In
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.setConfirmed(true);
            }}
          >
            Main Page
          </Button>
        </Stack>
      </Box>
    </div>
    </div>
  );
}
