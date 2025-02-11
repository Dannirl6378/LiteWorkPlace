import axios from "axios";

// Funkce pro získání uživatele na základě e-mailu
export async function getUser(email) {
  try {
    const response = await axios.get(
      `https://muj-backend-jxbr.onrender.com/api/getUser/${email}`,
    );
    return response.data; // Return the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}

