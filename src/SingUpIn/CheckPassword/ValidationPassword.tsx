import { useEffect } from "react";

interface ValidationProps {
  value: {
    pwd: string;
  };
  setValidationChangePassword:(isValid: boolean) => void;
}

function ValidationPassword({
  value,
  setValidationChangePassword,
}: ValidationProps) {



  useEffect(() => {
    
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const isValid = passwordPattern.test(value.pwd);
    const validationResultPassword = isValid ? true : false;
    console.log("validPassword",validationResultPassword)
    setValidationChangePassword(validationResultPassword);
  }, [value]);

  return null; // Vracíme null, protože tento komponent nepotřebuje žádný vizuální výstup.
}

export default ValidationPassword;
