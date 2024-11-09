// AxiosLoginjs
import axios from "axios";

export async function LoginUser(userData) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/login", // Opravená URL
      userData // Odeslání uživatelských dat jako tělo požadavku
    );
    console.log("AxiosLoginUser",response.data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Error nothing found." };
  }
}
