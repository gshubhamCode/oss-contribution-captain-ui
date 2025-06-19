// components/Header.tsx
import React from "react";
import {
  Flex,
  Heading,
  Input,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface HeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchInput,
  setSearchInput,
  onSearchKeyDown,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
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
          placeholder="Search by ID, title, language, label..."
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
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="outline"
        size="sm"
        ml={2}
      />
    </Flex>
  );
};

export default Header;
