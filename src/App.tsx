import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [searchInput, setSearchInput] = useState('');
  const [languageFilters, setLanguageFilters] = useState([]);
  const [labelFilters, setLabelFilters] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get('search') || '';
    setSearchInput(initialSearch);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/issues/summaries');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIssues(data.summaries);
      } catch (error) {
        setError('Failed to fetch issues. Please check the server or try again later.');
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const issueMatches = (issue) => {
    const issueDTO = issue.issueDTO;
    const summaryText = issue.summary?.toLowerCase() || '';
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
    if (e.key === 'Enter') {
      const url = new URL(window.location.href);
      url.searchParams.set('search', e.currentTarget.value);
      window.history.pushState(null, '', url);
      setSearchInput(e.currentTarget.value);
      setCurrentPage(1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedIndex((page - 1) * pageSize); // optionally reset selection on page change
      scrollToTop();
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarBg = useColorModeValue('white', 'gray.800');

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

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} color={useColorModeValue('gray.800', 'white')}>
      {/* Fixed Header */}
      <Flex
        as="header"
        w="100%"
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        boxShadow="md"
        position="fixed"
        zIndex={50}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h4" size="lg">
          🚀 Open Source Contribution Helper
        </Heading>
        <Flex flex={1} justifyContent="center" mx={4}>
          <Input
            placeholder="Search by ID, title, language, label..."
            value={searchInput}
            onKeyDown={handleSearchKeyDown}
            onChange={(e) => setSearchInput(e.target.value)}
            size="md"
            maxW="md"
            bg={useColorModeValue('white', 'gray.700')}
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
          />
        </Flex>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <ArrowUpIcon /> : <ArrowUpIcon />}
          onClick={toggleColorMode}
          variant="outline"
          size="sm"
          ml={2}
        />
      </Flex>

      <Flex pt={16} px={4}>
        {/* Sidebar sliding box */}
        <Box
          position="relative"
          w={sidebarOpen ? '300px' : '40px'}
          bg={sidebarBg}
          boxShadow="lg"
          borderRightRadius="md"
          transition="width 0.3s ease"
          overflow="hidden"
        >
          <IconButton
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            icon={sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            onClick={toggleSidebar}
            position="absolute"
            top="10px"
            right={sidebarOpen ? '-20px' : '-20px'}
            zIndex={10}
            size="sm"
            borderRadius="full"
            boxShadow="md"
            bg={sidebarBg}
          />

          {sidebarOpen && (
            <Box p={6}>
              <Heading as="h3" size="md" mb={4}>
                Filter by Language
              </Heading>
              <Select
                multiple
                value={languageFilters}
                onChange={(e) => setLanguageFilters(Array.from(e.target.selectedOptions, (option) => option.value))}
                mb={6}
                bg={useColorModeValue('white', 'gray.700')}
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
              >
                {['Java', 'Python', 'JavaScript', 'TypeScript', 'Go'].map((lang) => (
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
                onChange={(e) => setLabelFilters(Array.from(e.target.selectedOptions, (option) => option.value))}
                bg={useColorModeValue('white', 'gray.700')}
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
              >
                {['springboot', 'react', 'angular', 'good first issue', 'feature', 'bug'].map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </Select>
            </Box>
          )}
        </Box>

        {/* Middle Column: Issues */}
        <Box
          flex="1"
          p={6}
          ml={sidebarOpen ? 4 : 0}
          transition="margin-left 0.3s ease"
          maxWidth="400px"
          overflowY="auto"
          maxHeight="70vh"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="md"
          borderRadius="md"
        >
          <Heading as="h3" size="md" mb={4}>
            📋 Issues
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
                  bg={isSelected ? useColorModeValue('blue.50', 'blue.900') : 'transparent'}
                  borderLeftWidth={isSelected ? '4px' : '0'}
                  borderLeftColor={isSelected ? 'blue.500' : 'transparent'}
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                  onClick={() => setSelectedIndex((currentPage - 1) * pageSize + idx)}
                >
                  <Flex alignItems="center">
                    <Text fontWeight="medium" color={useColorModeValue('gray.800', 'gray.200')}>
                      {issue.issueDTO.title} (#{issue.issueDTO.id})
                    </Text>
                    <Text ml="auto" color={useColorModeValue('gray.500', 'gray.400')} fontSize="sm">
                      1:44 AM
                    </Text>
                  </Flex>
                </Box>
              );
            })}
            {paginatedIssues.length === 0 && (
              <Text p={4} textAlign="center" color={useColorModeValue('gray.500', 'gray.400')}>
                No issues match the filters.
              </Text>
            )}
          </Stack>

          {/* Pagination */}
          {totalPages > 1 && (
            <Flex justifyContent="center" mt={4} gap={2} alignItems="center">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                leftIcon={<ArrowBackIcon />}
                colorScheme="gray"
                variant="outline"
              >
                Previous
              </Button>

              <Text>
                Page{' '}
                <Input
                  type="number"
                  value={currentPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) handlePageChange(val);
                  }}
                  width="60px"
                  display="inline-block"
                  mx={2}
                  size="sm"
                />{' '}
                of {totalPages}
              </Text>

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                rightIcon={<ArrowForwardIcon />}
                colorScheme="gray"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
          )}
        </Box>

        {/* Right Column: Issue Details */}
        <Box
          flex="2"
          p={6}
          ml={4}
          maxHeight="70vh"
          overflowY="auto"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="md"
          borderRadius="md"
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
                <Text as="span" fontWeight="bold" color={useColorModeValue('gray.700', 'gray.300')}>
                  Repository:
                </Text>{' '}
                <Link
                  href={paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.url}
                  isExternal
                  color="blue.500"
                >
                  {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.repositoryName}
                </Link>
              </Text>
              <Text mb={2}>
                <Text as="span" fontWeight="bold" color={useColorModeValue('gray.700', 'gray.300')}>
                  Labels:
                </Text>{' '}
                {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].issueDTO.labels?.join(', ') || 'None'}
              </Text>
              <Heading as="h3" size="md" mt={4} display="flex" alignItems="center">
                Summary{' '}
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
              <Text mt={2} color={useColorModeValue('gray.700', 'gray.300')}>
                {paginatedIssues[selectedIndex - (currentPage - 1) * pageSize].summary}
              </Text>
            </Box>
          ) : (
            <Text textAlign="center" color={useColorModeValue('gray.500', 'gray.400')}>
              No issue selected or no issues match the filters.
            </Text>
          )}
        </Box>
      </Flex>

      {/* Back to Top Button */}
      <IconButton
        aria-label="Back to top"
        icon={<ArrowUpIcon />}
        position="fixed"
        bottom={8}
        right={8}
        colorScheme="gray"
        onClick={scrollToTop}
        _hover={{ bg: 'gray.600' }}
      />
    </Box>
  );
}
