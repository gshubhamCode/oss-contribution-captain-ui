import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Spinner,
  useColorModeValue,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import {ArrowUpIcon} from "@chakra-ui/icons";
import DisclaimerModal from "./components/DisclaimerModal";
import SetColorModeBasedOnTime from "./components/SetColorModeBasedOnTime";
import { NotificationBanner } from "./types/NotificationBanner";
import Sidebar from "./components/Sidebar";
import IssueList from "./components/IssueList";
import IssueDetails from "./components/IssueDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const hasFetched = useRef(false);
  const [searchInput, setSearchInput] = useState("");
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [labelFilters, setLabelFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = React.useState("updated"); // default to recently updated
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const pageSize = 10;
  const [notificationMessages, setNotificationMessages] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/banners")
      .then((res) => res.json())
      .then((data) => {
        const now = Date.now();
        const validMessages = data
          .filter((banner: NotificationBanner) => banner.expiryTime > now)
          .map((banner: NotificationBanner) => banner.message);
        setNotificationMessages(validMessages);
      })
      .catch((err) => {
        console.error("Failed to fetch banners", err);
      });
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/issues/summaries`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setIssues(data.summaries);

      const allLabels = Array.from(
        new Set(
          data.summaries.flatMap((issue: any) => {
            const labels = issue.issueDTO.labels;
            return Array.isArray(labels) ? labels : [];
          })
        )
      ).sort();

      const allLanguages = Array.from(
        new Set(
          data.summaries.flatMap((issue: any) => {
            const langsMap = issue.issueDTO.repository?.languages;
            return langsMap && typeof langsMap === "object"
              ? Object.keys(langsMap)
              : [];
          })
        )
      ).sort();

      setAvailableLabels(allLabels);
      setAvailableLanguages(allLanguages);
    } catch (err) {
      setError("Uh oh, something went wrong while fetching the issues.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, []);

  const issueMatches = (issue: any) => {
    const issueDTO = issue.issueDTO;
    const title = issueDTO.title.toLowerCase();
    const issueId = String(issueDTO.id);
    const labels = issueDTO.labels?.map((l: string) => l.toLowerCase()) || [];

    const languagesMap = issueDTO.repository?.languages || {};
    const languages = Object.keys(languagesMap);

    const searchLower = searchInput.toLowerCase();
    const searchMatch =
      !searchLower ||
      title.includes(searchLower) ||
      issueId.includes(searchLower) ||
      labels.some((l: string) => l.includes(searchLower)) ||
      languages.some((lang: string) => lang.toLowerCase().includes(searchLower));

    const langMatch =
      languageFilters.length === 0 ||
      languageFilters.every((lang) => languages.includes(lang));

    const labelMatch =
      labelFilters.length === 0 ||
      labelFilters.every((lbl) => labels.includes(lbl.toLowerCase()));

    return searchMatch && langMatch && labelMatch;
  };

  // Filter issues first
  const filteredIssues = issues.filter(issueMatches);

  // Then sort based on selected sortOption (no secondary sort)
  const sortedIssues = filteredIssues.sort((a, b) => {
    const aDTO = a.issueDTO;
    const bDTO = b.issueDTO;

    switch (sortOption) {
      case "forks":
        return (bDTO.repository?.forksCount || 0) - (aDTO.repository?.forksCount || 0);
      case "stars":
        return (bDTO.repository?.stargazersCount || 0) - (aDTO.repository?.stargazersCount || 0);
      case "watchers":
        return (bDTO.repository?.subscribersCount || 0) - (aDTO.repository?.subscribersCount || 0);
      case "created":
        return new Date(bDTO.createdAt).getTime() - new Date(aDTO.createdAt).getTime();
      case "updated":
      default:
        return new Date(bDTO.updatedAt).getTime() - new Date(aDTO.updatedAt).getTime();
    }
  });

  const totalPages = Math.ceil(sortedIssues.length / pageSize);
  const paginatedIssues = sortedIssues.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  React.useEffect(() => {
    // Reset pagination and selection when filters or sort change
    setCurrentPage(1);
    if (filteredIssues.length > 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1); // or null if you prefer no selection when no items
    }
  }, [languageFilters, labelFilters, sortOption, issues]); 
  

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePageChange = (page: number) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
    setSelectedIndex((page - 1) * pageSize);
    scrollToTop();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = new URL(window.location.href);
      url.searchParams.set("search", e.currentTarget.value);
      window.history.pushState(null, "", url);
      setSearchInput(e.currentTarget.value);
      setCurrentPage(1);
    }
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");

  if (loading)
    return (
      <Box
        textAlign="center"
        p={8}
        bg={bgColor}
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          color={useColorModeValue("teal.500", "teal.300")}
        />
        <Text mt={4} fontSize="lg" fontWeight="medium" color={useColorModeValue("gray.700", "gray.300")}>
          Loading GitHub Issues...
        </Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" p={8} maxW="400px" mx="auto" mt={20} bg={useColorModeValue("red.50", "red.900")} borderRadius="md"
        boxShadow={useColorModeValue("0 0 10px rgba(220, 38, 38, 0.3)", "0 0 10px rgba(245, 101, 101, 0.6)")}>
        <Text fontSize="xl" fontWeight="bold" color={useColorModeValue("red.600", "red.300")}>{error}</Text>
        <Text mt={2} color={useColorModeValue("red.700", "red.400")}>Please check your network connection or try again later.</Text>
        <Button mt={6} colorScheme="red" onClick={fetchData}>Retry</Button>
      </Box>
    );

  return (
    <>
      <SetColorModeBasedOnTime />

      <Box minH="100vh" bg={bgColor} color={useColorModeValue("gray.800", "white")} display="flex" flexDirection="column">
        <Header
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearchKeyDown={handleSearchKeyDown}
          notificationMessages={notificationMessages}
        />

        <DisclaimerModal />

        <Box flex="1">
          <Flex pt={16} px={4} minH="calc(100vh - 64px)">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              languageFilters={languageFilters}
              labelFilters={labelFilters}
              setLanguageFilters={setLanguageFilters}
              setLabelFilters={setLabelFilters}
              availableLanguages={availableLanguages}
              availableLabels={availableLabels}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />

          
            <IssueList
              issues={paginatedIssues}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              pageSize={pageSize}
            />

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
              <IssueDetails
                issue={
                  paginatedIssues.length > 0 &&
                  selectedIndex >= (currentPage - 1) * pageSize &&
                  selectedIndex < currentPage * pageSize
                    ? paginatedIssues[selectedIndex - (currentPage - 1) * pageSize]
                    : null
                }
              />
            </Box>
          </Flex>
        </Box>

        <Footer />

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
    </>
  );
}
