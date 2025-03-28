// AxiosRegisterUser.js
import axios from "axios";

export async function getUser(userData) {
  try {
    const response = await axios.get(
      "https://muj-backend-jxbr.onrender.com/api/all",
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Error during registration." };
  }
}
