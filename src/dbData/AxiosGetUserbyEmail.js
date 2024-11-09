import axios from "axios";

// Funkce pro získání uživatele na základě e-mailu
export async function getUser(email) {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/getUser/${email}`,
    );
    console.log("AxiosGetUserbyEmail", response.data);
    return response.data; // Return the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

