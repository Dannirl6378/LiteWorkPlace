// AxiosLoginjs
import axios from "axios";

export async function LoginUser(userData) {
  try {
    const response = await axios.post(
      "https://muj-backend-jxbr.onrender.com/api/login", // Opravená URL
      userData // Odeslání uživatelských dat jako tělo požadavku
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Error nothing found." };
  }
}
