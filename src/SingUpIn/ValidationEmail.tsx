import React, { useEffect } from 'react';
import { fetchData } from '../dbData/Axios';

interface ValidationProps {
  value: {
    email: string;
  };
  setValidationChangeEmail:(isValid: boolean) => void;
}


function ValidationEmail({ value, setValidationChangeEmail }: ValidationProps) {
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(value.email);
  
    async function checkEmailExistence() {
      try {
        const data = await fetchData(); // Získání dat z databáze
        const emailArray = data.map((user: { email: any; }) => user.email);
        const isSame = (emailArray as Array<any>).includes(value.email);
        const validationResultEmail = isValid && isSame ? true : false;
        setValidationChangeEmail(validationResultEmail);
      } catch (error) {
        console.error('Chyba při načítání dat z databáze:', error);
      }
    }
  
    checkEmailExistence();
  }, [value]);

  return null;
}

export default ValidationEmail;
