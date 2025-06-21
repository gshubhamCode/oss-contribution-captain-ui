import React from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  Divider,
  Badge,
  Wrap,
  WrapItem,
  Flex,
  Spacer
} from "@chakra-ui/react";
import Pagination from "./Pagination";

interface Repository {
  name: string;
  fullName: string;
  htmlUrl: string;
  languages?: { [key: string]: number };
}

interface IssueDTO {
  title: string;
  user: string;
  userAvatarUrl: string;
  userHtmlUrl: string;
  url: string;
  repositoryName: string;
  labels: string[];
  repository?: Repository;
}

interface Summary {
  main?: string;
  validationOrRequirement?: string;
  attemptedFixes?: string;
  otherNotes?: string;
  summaryText?: string;
  validJson: boolean;
}

interface Issue {
  issueDTO: IssueDTO;
  summary: Summary;
}

interface Props {
  issues: Issue[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  pageSize: number;
}

const IssueList: React.FC<Props> = ({
  issues,
  currentPage,
  totalPages,
  onPageChange,
  selectedIndex,
  setSelectedIndex,
  pageSize,
}) => {
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const selectedBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Box
      flexShrink={0}
      w={["95vw", "385px"]}
      p={6}
      ml={[0, 4]}
      maxW="100%"
      maxH="calc(100vh - 96px)"
      overflowY="auto"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg={bg}
    >
      <Flex align="center" mb={4} flexWrap="wrap">
        <Heading as="h3" size="md">
          GitHub Open Issues
        </Heading>
        <Spacer />

        <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={onPageChange} 
        showButtons={false}
        />

      </Flex>

      <Divider mb={4} />

      <Stack spacing={0}>
        {issues.map((issue, idx) => {
          const isSelected = selectedIndex === (currentPage - 1) * pageSize + idx;
          const { title, repository } = issue.issueDTO;
          const summary = issue.summary;

          const tooltipContent = title;

          const languageKeys = repository?.languages
            ? Object.keys(repository.languages).sort((a, b) => a.localeCompare(b))
            : [];

          return (
            <Tooltip
              key={idx}
              label={tooltipContent}
              hasArrow
              placement="top"
              openDelay={300}
              bg={useColorModeValue("gray.700", "gray.600")}
              color="white"
              whiteSpace="pre-line"
              fontSize="sm"
            >
              <Box
                py={4}
                px={4}
                mb={1}
                minHeight="100px"
                borderBottomWidth="1px"
                cursor="pointer"
                bg={isSelected ? selectedBg : "transparent"}
                borderLeftWidth={isSelected ? "4px" : "0"}
                borderLeftColor={isSelected ? "blue.500" : "transparent"}
                _hover={{ bg: hoverBg }}
                onClick={() => setSelectedIndex((currentPage - 1) * pageSize + idx)}
              >
                <Text
                  fontWeight="semibold"
                  color={useColorModeValue("gray.800", "gray.100")}
                  noOfLines={1}
                >
                  {title}
                </Text>

                <Box h="2" />
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                  noOfLines={3}
                >
                  {typeof summary?.main === "string"
                    ? summary.main
                    : "No summary available"}
                </Text>

                  {/* Language badges */}
                  {languageKeys.length > 0 && (
                  <Wrap mt={2}>
                    {languageKeys.map((lang) => (
                      <WrapItem key={lang}>
                        <Badge
                          colorScheme="purple"
                          borderRadius="md"
                          fontSize="xs"
                          px={2}
                          py={0.5}
                        >
                          {lang}
                        </Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                )}
              </Box>
            </Tooltip>
          );
        })}
        {issues.length === 0 && (
          <Text p={4} textAlign="center" color={useColorModeValue("gray.500", "gray.400")}>
            No issues match the filters.
          </Text>
        )}
      </Stack>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </Box>
  );
};

export default IssueList;
