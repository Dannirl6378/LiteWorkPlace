import axios from "axios";

// Funkce pro získání uživatele na základě e-mailu
export async function getUser(email) {
  try {
    const response = await axios.get(`http://localhost:3001/api/user/${email}`);
    return response.data;
  } catch (error) {
    throw new Error("Chyba při získávání uživatelských dat.");
  }
}
