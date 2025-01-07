import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Update, Delete } from "../dbData/AxiosUpdateDelete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  const getuserDataString = sessionStorage.getItem("userDatas");
  let userData;
  if (getuserDataString) {
    try {
      userData = JSON.parse(getuserDataString);
      console.log(userData);
    } catch (error) {
      console.error("Error parsing user data", error);
    }
  }

  const userEmail = userData?.email ?? null;
  const userName = userData?.name?? null;
  console.log("email working page", userEmail);

  const handleUpdate = (field: string) => {
    if (field === "username" && userEmail) {
      Update(username, userEmail, null); // Only update username
    } else if (field === "password" && password) {
      Update(null, userEmail, password); // Only update password
    } else {
      alert("Please fill in a valid field.");
    }
  };

  const handleDelete = () => {
    if (deletePassword && userEmail) {
      Delete(deletePassword, userEmail); // Delete user data
      setDialogOpen(false);
    } else {
      alert("Please enter your password to delete data.");
    }
  };
  const navigate = useNavigate();
  const backOnProject = () => {
    navigate(`/workingPage`);
  };

  return (
    <div className="app">
       <Button
          onClick={backOnProject}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Home
        </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          lineHeight: 1.6,
          fontSize: "1rem",
          padding: "16px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 2,
          maxWidth: "500px",
          position: "absolute",
          top: "25%",
          left: "32%",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
          Profile Settings
        </Typography>

        <Box>
          <TextField
            label={`Change username ${userName}`}
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            onClick={() => handleUpdate("username")}
            fullWidth
          >
            Update Username
          </Button>
        </Box>
        <Box>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "10px",marginTop:"20px" }}
          />
          <Button
            variant="contained"
            onClick={() => handleUpdate("password")}
            fullWidth
          >
            Update Password
          </Button>
        </Box>
        {/* Delete Data Button */}
        <Button
          variant="contained"
          color="error"
          onClick={() => setDialogOpen(true)}
          fullWidth
          sx={{ marginTop: "16px" }}
        >
          Delete Data
        </Button>

        {/* Confirmation Dialog */}
        <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Profile;
