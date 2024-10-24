import axios from "axios";

// Funkce pro načtení uživatelských dat
export const fetchUserData = async (email) => {
  try {
    const response = await axios.get(`http://localhost:3001/getUsers/${email}`);
    console.log("PushGetData", response.data);
  } catch (error) {
    console.error("Chyba při získávání uživatelských dat:", error);
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
    const response = await axios.post("http://localhost:3001/user/update", {
      email,
      akceCalander,
      Quilltext,
      todoList,
    });
    console.log("UpdateUserDataAktualizace úspěšná:", response.data);
  } catch (error) {
    console.error("Chyba při aktualizaci uživatelských dat:", error);
  }
};
