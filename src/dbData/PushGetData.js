import axios from "axios";
// Funkce pro načtení uživatelských dat
export const fetchUserData = async (email) => {
  try {
    const response = await axios.get(`https://muj-backend-jxbr.onrender.com/api/getUser/${email}`);
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
    const response = await axios.patch("https://muj-backend-jxbr.onrender.com/api/update", {
      email,
      akceCalander, 
      Quilltext, 
      todoList, 
    });
  } catch (error) {
    console.error("Chyba při aktualizaci uživatelských dat:", error);
  }
};

