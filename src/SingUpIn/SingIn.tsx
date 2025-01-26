import axios from "axios";

export async function handleSignIn(
  email: string,
  pwd: string,
  navigate: (path: string) => void, // Předáváme funkci pro navigaci
) {
  try {
    const response = await axios.post("https://muj-backend-jxbr.onrender.com/api/login", {
      password: pwd,
      email: email,
    });

    const isValidPassword = response.data.message === "Přihlášení úspěšné.";
    if (isValidPassword) {
      navigate("/workingPage");
      return true;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Chyba při ověřování hesla:",
        error.response?.data?.error || error.message,
      );
    } else {
      console.error("Neznámá chyba:", error);
    }
  }

  return false;
}
