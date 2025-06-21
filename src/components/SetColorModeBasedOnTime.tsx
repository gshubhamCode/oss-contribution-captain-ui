import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

const SetColorModeBasedOnTime = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return; // don't override user preference

    const hour = new Date().getHours();
    const preferDark = hour >= 19 || hour < 6;

    if ((preferDark && colorMode === "light") || (!preferDark && colorMode === "dark")) {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return null;
};

export default SetColorModeBasedOnTime;
