import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { Update, Delete } from '../dbData/AxiosUpdateDelete';

function Profile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);


  const getuserDataString = sessionStorage.getItem("userDatas");
  let userData;
  if (getuserDataString) {
    try {
      userData = JSON.parse(getuserDataString);
      console.log(userData);
    } catch (error) {
      console.error("chybav rodeleni dat", error);
    }
  }

  const userName = userData?.name ?? null;
  console.log("userNameworkingpage", userName);
 

  const handleUpdate = () => {
    if (username && password && userName) {
        Update(username, password); // Aktualizace uživatelského jména a hesla
      } else {
        alert('Please fill in both username and password.');
      }
  };

  const handleDelete = () => {
    if (deletePassword && userName) {
        Delete(deletePassword, userName ); // Smazání dat s heslem uživatele
        setDialogOpen(false);
      } else {
        alert('Please enter your password to delete data.');
      }
  };

  return (
    <Box sx={{ padding: '16px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" sx={{ marginBottom: '16px' }}>Profile Settings</Typography>
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="New Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <Button variant="contained" onClick={handleUpdate} fullWidth>
        Update
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setDialogOpen(true)}
        fullWidth
        sx={{ marginTop: '16px' }}
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
  );
}

export default Profile;
