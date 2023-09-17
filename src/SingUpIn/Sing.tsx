import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import "./Sing.css";
import shadows from "@mui/material/styles/shadows";

interface SingProps {
  setConfirmed: (confirmed: boolean) => void;
}

export default function Sing(props: SingProps) {
  const [action, setAction] = useState("Sing Up");
  return (
    <div className="form">
      <Box
        sx={{
          maxWidth: "20vw",
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


        <CheckIcon />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Person2OutlinedIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField id="input-with-sx" label="Name" variant="standard" />
        </Box>


        <CheckIcon />
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailOutlinedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Email" variant="standard" />
        </Box>


        <CheckIcon />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            padding: "0em 0em 1em",
          }}
        >
          <LockOutlinedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Password" variant="standard" />
        </Box>
        {action === "Sing Up" ? 
        <>
        <CheckIcon />
        <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              padding: "0em 0em 1em",
            }}
          >
            <LockOutlinedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Confirm Password"
              variant="standard" />
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
  );
}
