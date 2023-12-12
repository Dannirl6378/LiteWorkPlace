// RegistrationUtils.js
import { registerUser } from "../dbData/AxiosRegisterUsers";

export async function handleRegistration(user: string, email: string, pwd: string) {
  const userData = {
    name: user,
    email: email,
    password: pwd,
  };

  try {
    const result = await registerUser(userData);
    console.log(result.message); // Display success or error message
    // You can add more logic here based on the result if needed
  } catch (error) {
    console.error(error);
  }
}
