import { useEffect } from "react";
import { getUser } from "../../dbData/AxiosGetUserbyEmail";

interface ValidationProps {
  value: {
    email: string;
  };
  setCheckIsEmail: (isValid: boolean) => void;
}

export default function CheckDataseEmail({
  value,
  setCheckIsEmail,
}: ValidationProps) {
  useEffect(() => {
    async function checkEmailExistence() {
      try {
        if (!value.email || value.email.trim() === "") {
          return;
        }
        const data = await getUser(value.email); // Získání dat z databáze
        // Zkontrolujeme, jestli je e-mail stejney
        const checkSameEmail =
          data && data.email === value.email ? true : false;
        setCheckIsEmail(checkSameEmail);
      } catch (error) {
        console.error("Chyba při načítání dat z databáze:", error);
        setCheckIsEmail(false); // Pokud dojde k chybě, nastavíme na false
      }
    }

    checkEmailExistence();
  }, [value, setCheckIsEmail]);

  return null;
}
