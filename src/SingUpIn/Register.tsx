import axios from "axios";

export async function handleRegistration(
  user: string,
  email: string,
  pwd: string
) {
  const userData = {
    name: user,
    email: email,
    password: pwd, // Send plain password; server will hash it
  };

  try {
    const response = await axios.post("http://localhost:3001/api/register", userData);
    console.log(response.data.message); // Display success or error message from the server
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle known Axios errors
      console.error("Registration error:", error.response?.data?.error || error.message);
    } else if (error instanceof Error) {
      // Handle other errors with Error type
      console.error("Unexpected error during registration:", error.message);
    } else {
      // Catch-all for unknown error types
      console.error("An unknown error occurred during registration:", error);
    }
  }
}
