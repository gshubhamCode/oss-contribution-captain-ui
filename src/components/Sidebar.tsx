import React from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Select from "react-select";

const languageOptions = [
  { value: "Java", label: "Java" },
  { value: "Python", label: "Python" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Go", label: "Go" },
];

const labelOptions = [
  { value: "springboot", label: "Spring Boot" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "good first issue", label: "Good First Issue" },
  { value: "feature", label: "Feature" },
  { value: "bug", label: "Bug" },
];

// react-select styles to match Chakra UI color modes and design
const customStyles = (colorMode: "light" | "dark") => ({
  control: (base: any) => ({
    ...base,
    backgroundColor: colorMode === "light" ? "white" : "#2D3748",
    borderColor: colorMode === "light" ? "#CBD5E0" : "#4A5568",
    minHeight: "36px",
    fontSize: "0.875rem",
    width: "260px", // fixed width
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
  input: (base: any) => ({
    ...base,
    color: colorMode === "light" ? "black" : "white",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: colorMode === "light" ? "black" : "white",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: colorMode === "light" ? "black" : "white",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: colorMode === "light" ? "#A0AEC0" : "#CBD5E0",
  }),
});

type Props = {
  languageFilters: string[];
  labelFilters: string[];
  setLanguageFilters: (filters: string[]) => void;
  setLabelFilters: (filters: string[]) => void;
};

const Sidebar: React.FC<Props> = ({
  languageFilters,
  labelFilters,
  setLanguageFilters,
  setLabelFilters,
}) => {
  const colorMode = useColorModeValue("light", "dark");

  return (
    <Box
      as="nav"
      position="relative"
      top="64px"
      h="calc(100vh - 64px)"
      w="300px"
      overflowY="auto"
      p={6}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Heading as="h3" size="md" mb={4}>
        Language
      </Heading>
      <Select
        options={languageOptions}
        isMulti
        value={languageOptions.filter((opt) => languageFilters.includes(opt.value))}
        onChange={(selected) => setLanguageFilters(selected.map((s) => s.value))}
        styles={customStyles(colorMode)}
        placeholder="Select languages..."
      />

      <Heading as="h3" size="md" mt={6} mb={4}>
        Framework / Label
      </Heading>
      <Select
        options={labelOptions}
        isMulti
        value={labelOptions.filter((opt) => labelFilters.includes(opt.value))}
        onChange={(selected) => setLabelFilters(selected.map((s) => s.value))}
        styles={customStyles(colorMode)}
        placeholder="Select labels..."
      />
    </Box>
  );
};

export default Sidebar;
