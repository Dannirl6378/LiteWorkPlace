import React, { useEffect } from "react";

interface ValidationProps {
  value: {
    pwd: string;
  };
  onValidationChangePassword: (validationResultPassword: string) => void;
}

function ValidationPassword({
  value,
  onValidationChangePassword,
}: ValidationProps) {
  useEffect(() => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const isValid = passwordPattern.test(value.pwd);
    const validationResultPassword = isValid ? 'true' : 'false';

    onValidationChangePassword(validationResultPassword);
  }, [value, onValidationChangePassword]);

  return null; // Vracíme null, protože tento komponent nepotřebuje žádný vizuální výstup.
}

export default ValidationPassword;
