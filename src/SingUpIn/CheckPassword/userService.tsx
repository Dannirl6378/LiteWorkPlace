import axios from 'axios';

export async function registerUser(name: string, email: string, password: string): Promise<void> {
  try {
    const response = await axios.post('http://localhost:3001/registerUser', {
      name,
      email,
      password,
    });

    console.log(response.data.message);
  } catch (error) {
    console.error('Chyba při registraci uživatele:', error);
  }
}
