// AxiosRegisterUser.js
import axios from "axios";

export async function getUser(userData) {
  try {
    const response = await axios.get(
      "http://localhost:3001/getUsers",
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Error during registration." };
  }
}
