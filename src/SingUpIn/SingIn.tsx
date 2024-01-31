import { Link } from "react-router-dom";
import axios from "axios";

export async function handleSignIn(
  user: string,
  email: string,
  pwd: string,
  navigate: (path: string) => void // Předáváme funkci pro navigaci
) {
  let isValidPassword;

  try {
    const response = await axios.post(
      "http://localhost:3001/api/passwordUtility/comparePassword",
      {
        password: pwd,
        email: email,
      }
    );
    isValidPassword = response.data.message === "Přihlášení úspěšné.";
    console.log("isValidPassword", isValidPassword);
  } catch (error) {
    console.error("Chyba při ověřování hesla:", error);
    return false;
  }

  if (isValidPassword) {
    // Redirect to workingPage
    navigate("/workingPage");
    return true;
  } else {
    return false;
  }
}
