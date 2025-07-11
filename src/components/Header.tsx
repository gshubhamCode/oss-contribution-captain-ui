import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  IconButton,
  useColorMode,
  useColorModeValue,
  Box,
  Tooltip,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, RepeatIcon, HamburgerIcon } from "@chakra-ui/icons";
import logoLight from "../assets/logo.avif";
import logoDark from "../assets/logo.avif";

interface HeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  notificationMessages?: string[];
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchInput,
  setSearchInput,
  onSearchKeyDown,
  notificationMessages,
  setSidebarOpen,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleColorModeWithPersistence = () => {
    const currentMode = localStorage.getItem("theme") || colorMode;
    const nextMode = currentMode === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextMode);
    toggleColorMode();
  };

  const resetToAutoTheme = () => {
    localStorage.removeItem("theme");
    const hour = new Date().getHours();
    const preferDark = hour >= 19 || hour < 6;
    if ((preferDark && colorMode === "light") || (!preferDark && colorMode === "dark")) {
      toggleColorMode();
    }
  };

  const logo = useColorModeValue(logoLight, logoDark);

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
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 0 }}
      >
        <Flex alignItems="center" gap={3}>
          {isMobile && (
            <IconButton
              icon={<HamburgerIcon boxSize={8} />}
              aria-label="Open sidebar"
              size="lg"
              onClick={() => setSidebarOpen(true)}
              variant="ghost"
            />
          )}

          {/* Logo Image */}
          <Image src={logo} alt="Logo" boxSize="40px" objectFit="contain" 
          cursor="pointer"
          onClick={() => window.location.reload()}
          />
          <Heading
            as="h4"
            textAlign="center"
            fontSize={{ base: "lg", md: "2xl" }}
            mb={{ base: 2, md: 0 }}
            cursor="pointer"
            onClick={() => window.location.reload()}
          >
            Open Source Contribution Captain
          </Heading>
        </Flex>

        <Flex flex={1} justifyContent="center" mx={4}>
          <Input
            placeholder="Search by title, language, label..."
            value={searchInput}
            onKeyDown={onSearchKeyDown}
            onChange={(e) => setSearchInput(e.target.value)}
            size="md"
            maxW="md"
            w="100%"
            bg={useColorModeValue("white", "gray.700")}
            borderColor={useColorModeValue("gray.300", "gray.600")}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          />
        </Flex>

        <Flex alignItems="center" gap={2}>

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

      {notificationMessages && isBannerVisible && notificationMessages.length > 0 && (
        <Box w="100%" mt="4" 
        position="relative" 
        top={{ base: "145px", md: "55px" }} 
        zIndex={40}>
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
