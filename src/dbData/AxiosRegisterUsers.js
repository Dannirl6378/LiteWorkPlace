// AxiosRegisterUser.js
import axios from "axios";

export async function registerUser(userData) {
  try {
    const response = await axios.post("http://localhost:3001/registerUser", userData);
    console.log("AxiosRegisterUser",response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Error during registration." };
  }
}
