import { fetchData } from "../dbData/Axios";
import React from "react";

const dataUser = "janesmith@example.com";// promená přihledaní 
interface UserData {
  _id: string;
  user: string;
  email: string;
}

async function FindUser(dataUser: string): Promise<void> {
  try {
    const data: UserData[] = await fetchData(); // Získání dat z databáze
    const user: UserData | undefined = data.find(
      (user) => user.email === dataUser
    );

    if (user) {
      console.log("Nalezený uživatel:", user);
    } else {
      console.log(`Uživatel s jménem ${dataUser} nebyl nalezen.`);
    }
  } catch (error) {
    console.error("Chyba při načítání dat z databáze:", error);
  }
}

export default FindUser(dataUser);
