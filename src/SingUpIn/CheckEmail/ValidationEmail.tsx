import { useEffect } from "react";


interface ValidationProps {
  value: {
    email: string;
  };
  setValidationChangeEmail: (isValid: boolean) => void;
}

function ValidationEmail({ value, setValidationChangeEmail }: ValidationProps) {
  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(value.email);
    
        const validationResultEmail = isValid ? true : false;
        setValidationChangeEmail(validationResultEmail);
    

  }, [value]);

  return null;
}

export default ValidationEmail;
