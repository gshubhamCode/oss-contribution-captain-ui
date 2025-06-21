import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  IconButton,
  useColorMode,
  useColorModeValue,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, RepeatIcon } from "@chakra-ui/icons";

interface HeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  notificationMessages?: string[];
}

const Header: React.FC<HeaderProps> = ({
  searchInput,
  setSearchInput,
  onSearchKeyDown,
  notificationMessages,
}) => {
  const { colorMode, setColorMode } = useColorMode();
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const toggleColorModeWithPersistence = () => {
    const nextMode = colorMode === "light" ? "dark" : "light";
    setColorMode(nextMode);
    localStorage.setItem("theme", nextMode);
  };

  const resetToAutoTheme = () => {
    localStorage.removeItem("theme");
    const hour = new Date().getHours();
    const preferDark = hour >= 19 || hour < 6;
    setColorMode(preferDark ? "dark" : "light");
  };

  return (
    <>
      <Flex
        as="header"
        w="100%"
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        boxShadow="md"
        position="fixed"
        zIndex={50}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h4" size="lg">
          Open Source Contribution Helper
        </Heading>

        <Flex flex={1} justifyContent="center" mx={4}>
          <Input
            placeholder="Search by title, language, label..."
            value={searchInput}
            onKeyDown={onSearchKeyDown}
            onChange={(e) => setSearchInput(e.target.value)}
            size="md"
            maxW="md"
            bg={useColorModeValue("white", "gray.700")}
            borderColor={useColorModeValue("gray.300", "gray.600")}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          />
        </Flex>

        {/* Theme Controls with Tooltips */}
        <Flex gap={2}>
          <Tooltip label="Toggle theme (light/dark)" hasArrow>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorModeWithPersistence}
              variant="outline"
              size="sm"
            />
          </Tooltip>

          <Tooltip label="Reset theme to auto mode" hasArrow>
            <IconButton
              aria-label="Reset theme"
              icon={<RepeatIcon />}
              onClick={resetToAutoTheme}
              variant="outline"
              size="sm"
            />
          </Tooltip>
        </Flex>
      </Flex>

      {notificationMessages && notificationMessages.length > 0 && (
        <Box w="100%" mt="4" position="relative" top="60px" zIndex={40}>
          {notificationMessages.map((msg, index) => (
            <Box
              key={index}
              bg="yellow.100"
              color="yellow.800"
              p={2}
              textAlign="center"
              fontSize="sm"
              borderBottom="1px solid"
              borderColor="yellow.300"
            >
              ⚠️ {msg}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default Header;
