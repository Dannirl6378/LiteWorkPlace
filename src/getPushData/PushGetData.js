import axios from "axios";

const fetchUserData = async (email) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/user/${email}`);
    console.log("Uživatelská data:", response.data);
  } catch (error) {
    console.error("Chyba při získávání uživatelských dat:", error);
  }
};

// Funkce pro aktualizaci uživatelských dat
const updateUserData = async (email, akceCalander, Quilltext, todoList) => {
  try {
    const response = await axios.post("http://localhost:3001/api/user/update", {
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

// Příklad použití:
const email = "user@example.com";
const akceCalander = ["Událost 1", "Událost 2"];
const quillText = "Text z editoru Quill";
const todoList = ["Úkol 1", "Úkol 2"];

// Načtení dat
fetchUserData(email);

// Aktualizace dat
updateUserData(email, akceCalander, quillText, todoList);
