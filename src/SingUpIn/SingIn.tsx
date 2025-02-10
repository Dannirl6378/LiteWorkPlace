import axios from "axios";

export async function handleSignIn(
  email: string,
  pwd: string,
  navigate: (path: string) => void
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await axios.post("https://muj-backend-jxbr.onrender.com/api/login", {
      password: pwd,
      email: email,
    });

    console.log("SignIn response:", response.data);

    if (response.status === 200 && response.data.message === "Přihlášení úspěšné.") {
      navigate("/workingPage");
      return { success: true };
    }

    return { success: false, message: "Neznámá odpověď od serveru." };
  } catch (error: any) {
    let errorMessage = "Chyba přihlášení.";

    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || "Neplatné přihlašovací údaje.";
    }
    console.error("SignIn error:", errorMessage);
    return { success: false, message: errorMessage };
  }
}
