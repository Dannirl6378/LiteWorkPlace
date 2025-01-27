// AxiosRegisterUser.js
import axios from "axios";

export async function getNews() {
  try {
    const response = await axios.get(
      "https://muj-backend-jxbr.onrender.com/api/news",
      userData
    );
    //console.log("getUsers_AxiosGetUsers",response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Error during registration." };
  }
}
