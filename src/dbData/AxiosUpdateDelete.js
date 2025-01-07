import axios from "axios";

export async function Update(username, password) {
    try {
        const response = await fetch('/api/updateData', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        if (result.success) {
          alert('Profile updated successfully!');
        } else {
          alert('Failed to update profile: ' + result.message);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
}

export async function Delete(deletePassword, userId) {
    
    try {
        const response = await fetch('/api/deleteData', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: deletePassword, userId: userId }), // Send userId and password
        });
    
        const result = await response.json();
        if (result.success) {
          alert('Data deleted successfully.');
        } else {
          alert('Failed to delete data: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    
}