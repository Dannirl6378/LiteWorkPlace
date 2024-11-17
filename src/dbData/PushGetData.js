import axios from "axios";
// Funkce pro načtení uživatelských dat
export const fetchUserData = async (email) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/getUser/${email}`);
    console.log("PushGetData", response.data);
    return response.data;
  } catch (error) {
    console.error("Chyba při získávání uživatelských dat:", error);
    throw error; // Přidání pro předání chyby dál
  }
};

// Funkce pro aktualizaci uživatelských dat
export const updateUserData = async (
  email,
  akceCalander,
  Quilltext,
  todoList,
) => {
  try {
    const response = await axios.patch("http://localhost:3001/api/update", {
      email,
      akceCalander, 
      Quilltext, 
      todoList, 
    });
    console.log("Aktualizace úspěšná:", response.data);
  } catch (error) {
    console.error("Chyba při aktualizaci uživatelských dat:", error);
  }
};

