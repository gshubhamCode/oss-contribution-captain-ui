// components/Sidebar.tsx
import React from "react";
import { Box, Heading, Select, useColorModeValue } from "@chakra-ui/react";

interface SidebarProps {
  sidebarOpen: boolean;
  languageFilters: string[];
  labelFilters: string[];
  setLanguageFilters: (val: string[]) => void;
  setLabelFilters: (val: string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  languageFilters,
  labelFilters,
  setLanguageFilters,
  setLabelFilters,
}) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      as="nav"
  position="relative"
  top="64px"
  left="0"
  h="calc(100vh - 130px)" 
  w={sidebarOpen ? ["80vw", "300px"] : "0"}
  maxW={sidebarOpen ? "300px" : "0"}
  transition="width 0.3s ease"
  overflowY="auto"        
  bg={bgColor}
  zIndex={20}
>
      {sidebarOpen && (
        <Box >
          <Heading as="h3" size="md" mb={4}>
            Filter by Language
          </Heading>
          <Select
            multiple
            value={languageFilters}
            onChange={(e) =>
              setLanguageFilters(Array.from(e.target.selectedOptions, (o) => o.value))
            }
            mb={6}
            bg={useColorModeValue("white", "gray.700")}
            borderColor={useColorModeValue("gray.300", "gray.600")}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            size="sm"
          >
            {["Java", "Python", "JavaScript", "TypeScript", "Go"].map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Select>

          <Heading as="h3" size="md" mb={4}>
            Filter by Framework / Label
          </Heading>
          <Select
            multiple
            value={labelFilters}
            onChange={(e) =>
              setLabelFilters(Array.from(e.target.selectedOptions, (o) => o.value))
            }
            bg={useColorModeValue("white", "gray.700")}
            borderColor={useColorModeValue("gray.300", "gray.600")}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            size="sm"
          >
            {["springboot", "react", "angular", "good first issue", "feature", "bug"].map(
              (label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              )
            )}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
