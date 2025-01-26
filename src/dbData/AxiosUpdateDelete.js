

export async function Update(newName,userEmail, newPassword,password) {
    try {
        const response = await fetch('https://muj-backend-jxbr.onrender.com/api/updateData', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email:userEmail, newName, newPassword, currentPassword: password }),
        });
        const result = await response.json();
        if (result.message) {
            alert('Profile updated successfully!');
        } else {
            alert('Failed to update profile: ' + result.error);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}

export async function Delete(deletePassword, userEmail) {
    try {
        const response = await fetch('https://muj-backend-jxbr.onrender.com/api/deleteData', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: deletePassword, email: userEmail }),
        });
        const result = await response.json();
        if (result.message) {
            alert('Data deleted successfully.');
        } else {
            alert('Failed to delete data: ' + result.error);
        }
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}
