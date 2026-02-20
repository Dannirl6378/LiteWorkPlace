import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function handleRegistration(
  user: string,
  email: string,
  pwd: string,
) {
  const userData = {
    name: user,
    email: email,
    password: pwd, // Send plain password; server will hash it
  };

  try {
    const response = await axios.post(
      "https://muj-backend-jxbr.onrender.com/api/register",
      userData,
    );

    // Zobrazíme notifikaci o úspěchu
    toast.success("Registrace úspěšná, můžete se přihlásit!");
  } catch (error) {
    // Při chybě zobrazíme notifikaci s chybovým hlášením
    if (axios.isAxiosError(error)) {
      // Pokud se jedná o Axios chybu
      toast.error(
        `Chyba při registraci: ${error.response?.data?.error || error.message}`,
      );
      console.error(
        "Registration error:",
        error.response?.data?.error || error.message,
      );
    } else if (error instanceof Error) {
      // Při jiných typech chyb
      toast.error(`Neočekávaná chyba při registraci: ${error.message}`);
      console.error("Unexpected error during registration:", error.message);
    } else {
      // Pro neznámé chyby
      toast.error("Došlo k neznámé chybě při registraci.");
      console.error("An unknown error occurred during registration:", error);
    }
  }
}

// Nezapomeňte přidat <ToastContainer /> do hlavní komponenty vašeho projektu
