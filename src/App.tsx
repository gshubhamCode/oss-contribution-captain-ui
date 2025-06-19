import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  Stack,
  Text,
  Image,
  Link,
  Spinner,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const onInputChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputValue(val);
    }
  };

  const onInputBlur = () => {
    let pageNum = Number(inputValue);
    if (pageNum < 1) pageNum = 1;
    else if (pageNum > totalPages) pageNum = totalPages;
    onPageChange(pageNum);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" mt={4} gap={3} fontSize="sm">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        leftIcon={<ArrowBackIcon />}
        colorScheme="gray"
        variant="outline"
        size="sm"
      >
        Prev
      </Button>

      <Text>
        Page{" "}
        <Input
          value={inputValue}
          onChange={onInputChange}
          onBlur={onInputBlur}
          onKeyDown={onKeyDown}
          maxW="50px"
          size="sm"
          textAlign="center"
          display="inline-block"
          verticalAlign="middle"
          mx={1}
        />{" "}
        / {totalPages}
      </Text>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        rightIcon={<ArrowForwardIcon />}
        colorScheme="gray"
        variant="outline"
        size="sm"
      >
        Next
      </Button>
    </Flex>
  );
}

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState("");
  const [languageFilters, setLanguageFilters] = useState([]);
  const [labelFilters, setLabelFilters] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pageSize = 15;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/issues/summaries");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setIssues(data.summaries);
      } catch (err) {
        setError("Failed to fetch issues. Please check the server or try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const issueMatches = (issue) => {
    const issueDTO = issue.issueDTO;
    const summaryText = issue.summary?.toLowerCase() || "";
    const title = issueDTO.title.toLowerCase();
    const issueId = String(issueDTO.id);
    const labels = issueDTO.labels?.map((l) => l.toLowerCase()) || [];
    const languages = issue.languages || [];

    const searchLower = searchInput.toLowerCase();
    const searchMatch =
      !searchLower ||
      title.includes(searchLower) ||
      issueId.includes(searchLower) ||
      labels.some((l) => l.includes(searchLower)) ||
      languages.some((lang) => lang.toLowerCase().includes(searchLower));

    const langMatch = !languageFilters.length || languageFilters.some((lang) => languages.includes(lang));
    const labelMatch = !labelFilters.length || labelFilters.some((lbl) => labels.includes(lbl));

    return searchMatch && langMatch && labelMatch;
  };

  const filteredIssues = issues.filter(issueMatches);

  const totalPages = Math.ceil(filteredIssues.length / pageSize);
  const paginatedIssues = filteredIssues.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const url = new URL(window.location.href);
      url.searchParams.set("search", e.currentTarget.value);
      window.history.pushState(null, "", url);
      setSearchInput(e.currentTarget.value);
      setCurrentPage(1);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePageChange = (page) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
    setSelectedIndex((page - 1) * pageSize);
    scrollToTop();
  };

  if (loading)
    return (
      <Box textAlign="center" p={4}>
        <Spinner size="lg" />
      </Box>
    );
  if (error)
    return (
      <Box textAlign="center" p={4} color="red.500">
        {error}
      </Box>
    );

  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box minH="100vh" bg={bgColor} color={useColorModeValue("gray.800", "white")}>
      {/* Header */}
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
            onKeyDown={handleSearchKeyDown}
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

      {/* Content */}
      <Flex pt={16} px={4} minH="calc(100vh - 64px)">
        {/* Sidebar */}
        <Box
  as="nav"
  position="relative"          // changed from relative to fixed
  top="64px"                // push down below fixed header (header height ~64px)
  left="0"
  height="calc(100vh - 64px)" // full viewport height minus header
  w={sidebarOpen ? ["80vw", "300px"] : "0"}
  maxW={sidebarOpen ? "300px" : "0"}
  transition="width 0.3s ease"
  overflow="hidden"
  bg={bgColor}
  zIndex={100}
>
          {sidebarOpen && (
            <Box p={6}>
              <Heading as="h3" size="md" mb={4}>
                Filter by Language
              </Heading>
              <Select
                multiple
                value={languageFilters}
                onChange={(e) => setLanguageFilters(Array.from(e.target.selectedOptions, (o) => o.value))}
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
                onChange={(e) => setLabelFilters(Array.from(e.target.selectedOptions, (o) => o.value))}
                bg={useColorModeValue("white", "gray.700")}
                borderColor={useColorModeValue("gray.300", "gray.600")}
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                size="sm"
              >
                {["springboot", "react", "angular", "good first issue", "feature", "bug"].map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </Select>
            </Box>
          )}
        </Box>

        {/* Sidebar Toggle Button */}
        <IconButton
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          icon={sidebarOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          position="fixed"
          top="80px"
          left={sidebarOpen ? ["80vw", "300px"] : "0"}
          transform="translateX(-50%)"
          size="sm"
          borderRadius="full"
          bg={useColorModeValue("gray.200", "gray.700")}
          color={useColorModeValue("gray.800", "white")}
          boxShadow="md"
          _hover={{ bg: useColorModeValue("gray.300", "gray.600") }}
          zIndex={1100}
        />

        {/* Issues list */}
        <Box
          flexShrink={0}
          w={["90vw", "350px"]} // increased width ~10%
          p={6}
          ml={[0, 4]}
          maxW="100%"
          maxH="calc(100vh - 96px)"
          overflowY="auto"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Heading as="h3" size="md" mb={4}>
            Git Issues
          </Heading>
          <Stack spacing={0}>
            {paginatedIssues.map((issue, idx) => {
              const isSelected = selectedIndex === (currentPage - 1) * pageSize + idx;
              return (
                <Box
                  key={idx}
                  p={3}
                  borderBottomWidth="1px"
                  cursor="pointer"
                  bg={isSelected ? useColorModeValue("blue.50", "blue.900") : "transparent"}
                  borderLeftWidth={isSelected ? "4px" : "0"}
                  borderLeftColor={isSelected ? "blue.500" : "transparent"}
                  _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                  onClick={() => setSelectedIndex((currentPage - 1) * pageSize + idx)}
                >
                  <Flex alignItems="center">
                    <Text fontWeight="medium" color={useColorModeValue("gray.800", "gray.200")}>
                      {issue.issueDTO.title} (#{issue.issueDTO.id})
                    </Text>
                    <Text ml="auto" color={useColorModeValue("gray.500", "gray.400")} fontSize="sm">
                      1:44 AM
                    </Text>
                  </Flex>
                </Box>
              );
            })}
            {paginatedIssues.length === 0 && (
              <Text p={4} textAlign="center" color={useColorModeValue("gray.500", "gray.400")}>
                No issues match the filters.
              </Text>
            )}
          </Stack>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Box>

        {/* Details */}
        <Box
          flex="1"
          p={6}
          ml={[0, 4]}
          maxWidth="100%"
          maxH="calc(100vh - 96px)"
          overflowY="auto"
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          boxShadow="md"
        >
          {paginatedIssues.length > 0 &&
          selectedIndex >= (currentPage - 1) * pageSize &&
          selectedIndex < currentPage * pageSize ? (
            <Box>
              <Flex justifyContent="flex-end" mb={4}>
                <Box textAlign="center">
                  <Image
                    src={paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.userAvatarUrl}
                    alt="avatar"
                    boxSize="16"
                    borderRadius="full"
                    objectFit="cover"
                  />
                  <Link
                    href={paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.userHtmlUrl}
                    isExternal
                    color="blue.500"
                    mt={2}
                    display="block"
                  >
                    {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.user}
                  </Link>
                </Box>
              </Flex>

              <Heading as="h2" size="xl" mb={2}>
                {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.title}
              </Heading>

              <Text mb={2}>
                <Text
                  as="span"
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "gray.300")}
                >
                  Repository:
                </Text>{" "}
                <Link
                  href={paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.url}
                  isExternal
                  color="blue.500"
                >
                  {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.repositoryName}
                </Link>
              </Text>

              <Text mb={2}>
                <Text
                  as="span"
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "gray.300")}
                >
                  Labels:
                </Text>{" "}
                {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.labels?.join(", ") || "None"}
              </Text>

              <Heading as="h3" size="md" mt={4} display="flex" alignItems="center">
                Summary{" "}
                <Text
                  as="span"
                  bg="green.500"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  px={2}
                  py={1}
                  ml={2}
                  borderRadius="full"
                >
                  🤖 AI Generated
                </Text>
              </Heading>
              <Text mt={2} color={useColorModeValue("gray.700", "gray.300")}>
                {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].summary}
              </Text>
            </Box>
          ) : (
            <Text textAlign="center" color={useColorModeValue("gray.500", "gray.400")}>
              No issue selected or no issues match the filters.
            </Text>
          )}
        </Box>
      </Flex>

      {/* Back to Top */}
      <IconButton
        aria-label="Back to top"
        icon={<ArrowUpIcon />}
        position="fixed"
        bottom={8}
        right={8}
        colorScheme="gray"
        onClick={scrollToTop}
        _hover={{ bg: "gray.600" }}
      />
    </Box>
  );
}
