import axios from "axios";

export async function GetUser(email: string) {
  let user;
  try {
    const response = await axios.post(
      "http://localhost:3001/api/passwordUtility/getUser",
      {
        email: email,
      }
    );
    user = response.data.message;
    console.log(user);
  } catch (error) {
    console.error("uživatel nenalezen:", error);
    return false;
  }
  if (user) {
    return true;
  } else {
    return false;
  }
}
