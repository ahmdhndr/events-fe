import { useState } from "react";

const useRegister = () => {
  const [visiblePassword, setVisiblePassword] = useState<{
    password: boolean;
    passwordConfirmation: boolean;
  }>({
    password: false,
    passwordConfirmation: false,
  });

  const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };
  return {
    visiblePassword,
    handleVisiblePassword,
  };
};

export default useRegister;
