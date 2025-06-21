import React from "react";
import { Box, Heading, useColorModeValue, RadioGroup, Stack, Radio, Button } from "@chakra-ui/react";
import Select, { MultiValue } from "react-select";

const customStyles = (colorMode: "light" | "dark") => ({
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: colorMode === "light" ? "white" : "#2D3748",
    borderColor: state.isFocused
      ? colorMode === "light"
        ? "#3182ce"
        : "#63b3ed"
      : colorMode === "light"
      ? "#CBD5E0"
      : "#4A5568",
    boxShadow: state.isFocused
      ? colorMode === "light"
        ? "0 0 0 1px #3182ce"
        : "0 0 0 1px #63b3ed"
      : "none",
    minHeight: "36px",
    fontSize: "0.875rem",
    width: "260px",
    color: colorMode === "light" ? "black" : "white",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: colorMode === "light" ? "white" : "#2D3748",
    color: colorMode === "light" ? "black" : "white",
    zIndex: 9999,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? colorMode === "light"
        ? "#3182ce"
        : "#63b3ed"
      : colorMode === "light"
      ? "white"
      : "#2D3748",
    color: state.isFocused
      ? "white"
      : colorMode === "light"
      ? "black"
      : "white",
    cursor: "pointer",
  }),
  input: (base: any) => ({
    ...base,
    color: colorMode === "light" ? "black" : "white",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: colorMode === "light" ? "#E2E8F0" : "#4A5568",
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

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  sidebarOpen: boolean;
  languageFilters: string[];
  labelFilters: string[];
  setLanguageFilters: (filters: string[]) => void;
  setLabelFilters: (filters: string[]) => void;
  availableLanguages: string[];
  availableLabels: string[];
  sortOption: string;
  setSortOption: (option: string) => void;
};

const Sidebar: React.FC<Props> = ({
  sidebarOpen,
  languageFilters,
  labelFilters,
  setLanguageFilters,
  setLabelFilters,
  availableLanguages,
  availableLabels,
  sortOption,
  setSortOption,
}) => {
  const colorMode = useColorModeValue("light", "dark");

  const languageOptions: OptionType[] = availableLanguages.map((lang) => ({
    value: lang,
    label: lang,
  }));

  const labelOptions: OptionType[] = availableLabels.map((label) => ({
    value: label,
    label: label,
  }));

  const handleResetFilters = () => {
    setLanguageFilters([]);
    setLabelFilters([]);
    setSortOption("updated");
  };

  return (
    <Box
      as="nav"
      position="relative"
      top="64px"
      h="calc(100vh - 160px)"
      w={sidebarOpen ? ["80vw", "300px"] : "0"}
      transition="width 0.3s ease"
      overflow="hidden"
      p={sidebarOpen ? 6 : 0}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {sidebarOpen && (
        <>
          <Heading as="h3" size="md" mb={4}>
            Language
          </Heading>
          <Select
            options={languageOptions}
            isMulti
            value={languageOptions.filter((opt) =>
              languageFilters.includes(opt.value)
            )}
            onChange={(selected: MultiValue<OptionType>) => {
              const values = selected ? selected.map((s) => s.value) : [];
              setLanguageFilters(values);
            }}
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
            onChange={(selected: MultiValue<OptionType>) => {
              const values = selected ? selected.map((s) => s.value) : [];
              setLabelFilters(values);
            }}
            styles={customStyles(colorMode)}
            placeholder="Select labels..."
          />

          <Heading as="h3" size="md" mt={6} mb={4}>
            Sort Issues By
          </Heading>
          <RadioGroup
            onChange={(value) => setSortOption(value)}
            value={sortOption}
            color={colorMode === "light" ? "black" : "white"}
          >
            <Stack spacing={3}>
              <Radio value="updated" defaultChecked>
                Recently Updated
              </Radio>
              <Radio value="forks">Fork Count</Radio>
              <Radio value="stars">Star Count</Radio>
              <Radio value="watchers">Watchers Count</Radio>
              <Radio value="created">Recently Created</Radio>
            </Stack>
          </RadioGroup>

          <Button
            mt={6}
            size="sm"
            variant="outline"
            colorScheme="gray"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </>
      )}
    </Box>
  );
};

export default Sidebar;

