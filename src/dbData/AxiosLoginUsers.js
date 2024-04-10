// AxiosRegisterUser.js
import axios from "axios";

export async function LoginUser(userData) {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/userpassword",

    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Error nothing found." };
  }
}
/*import axios from "axios";      na to se pozdeji podivat????

export async function LoginUser(userData) {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/userpassword",
      { params: userData }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Error nothing found." };
  }
}
*/