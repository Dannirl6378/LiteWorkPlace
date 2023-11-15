import { useEffect } from "react";
import { fetchData } from "../../dbData/Axios";


interface ValidationProps {
  value: {
    email: string;
  };
  setCheckIsEmail: (isValid: boolean) => void;
}

export default function ValidationEmail({ value, setCheckIsEmail }: ValidationProps) {
  useEffect(() => {

    async function checkEmailExistence() {
      try {
        const data = await fetchData(); // Získání dat z databáze
        const emailArray = data.map((user: { email: any }) => user.email);
        const isSame = (emailArray as Array<any>).includes(value.email);
        const checkSameEmail = isSame ? true : false;
        setCheckIsEmail(checkSameEmail);
        console.log("test same", checkSameEmail);
      } catch (error) {
        console.error("Chyba při načítání dat z databáze:", error);
      }
    }

    checkEmailExistence();
  }, [value]);

  return null;
}
