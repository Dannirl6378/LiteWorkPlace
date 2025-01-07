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
      console.error("Error parsing user data", error);
    }
  }

  const userEmail = userData?.email ?? null;
  console.log("email working page", userEmail);

  const handleUpdate = (field:string) => {
    if (field === 'username' && userEmail) {
      Update(username, userEmail, null); // Only update username
    } else if (field === 'password' && password) {
      Update(null,userEmail, password); // Only update password
    } else {
      alert('Please fill in a valid field.');
    }
  };

  const handleDelete = () => {
    if (deletePassword && userEmail) {
      Delete(deletePassword, userEmail); // Delete user data
      setDialogOpen(false);
    } else {
      alert('Please enter your password to delete data.');
    }
  };

  return (
    <Box sx={{ padding: '16px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" sx={{ marginBottom: '16px' }}>Profile Settings</Typography>

      {/* Username Input */}
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <Button variant="contained" onClick={() => handleUpdate('username')} fullWidth>
        Update Username
      </Button>

      {/* Password Input */}
      <TextField
        label="New Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <Button variant="contained" onClick={() => handleUpdate('password')} fullWidth>
        Update Password
      </Button>

      {/* Delete Data Button */}
      <Button
        variant="outlined"
        color="error"
        onClick={() => setDialogOpen(true)}
        fullWidth
        sx={{ marginTop: '16px' }}
      >
        Delete Profile
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
