// Register.
import { registerUser } from "../dbData/AxiosRegisterUsers";
import axios from "axios";

export async function handleRegistration(
  user: string,
  email: string,
  pwd: string
) {
  let hashedPassword;
  try {
    const response = await axios.post("http://localhost:3001/api/passwordUtility/hashPassword", {
      password: pwd,
      
    });
    console.log("response pwd hash", response.data);
    hashedPassword = response.data.hashedPassword;
  } catch (error) {
    console.error(error);
    return;
  }
  const userData = {
    name: user,
    email: email,
    password: hashedPassword,
  };

  try {
    const result = await registerUser(userData);
    console.log(result.message); // Display success or error message
    // You can add more logic here based on the result if needed
  } catch (error) {
    console.error(error);
  }
}

/*import axios from "axios";
import { registerUser } from "../dbData/AxiosRegisterUsers";

export async function handleRegistration(
  user: string,
  email: string,
  pwd: string
) {
  let hashedPassword;
  try {
    const response = await axios.post("/api/passwordUtility/hashPassword", {
      password: pwd,
    });
    hashedPassword = response.data.hashedPassword;
  } catch (error) {
    console.error(error);
    return;
  }

  const userData = {
    name: user,
    email: email,
    password: hashedPassword,
  };

  try {
    const result = await registerUser(userData);
    console.log(result.message); // Display success or error message
    // You can add more logic here based on the result if needed
  } catch (error) {
    console.error(error);
  }
}
*/
