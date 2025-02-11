// AxiosRegisterUser.js
import axios from "axios";

export async function registerUser(userData) {
  try {
    const response = await axios.post("https://muj-backend-jxbr.onrender.com/api/register", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Error during registration." };
  }
}
