import React from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import Pagination from "./Pagination";

type Props = {
  issues: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  pageSize: number;
};

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
      <Heading as="h3" size="md" mb={4}>
        Git Issues
      </Heading>
      <Stack spacing={0}>
        {issues.map((issue, idx) => {
          const isSelected = selectedIndex === (currentPage - 1) * pageSize + idx;
          const { title } = issue.issueDTO;
          const summary = issue.summary || "";

          const tooltipContent = `${title}`;

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
                  noOfLines={2}
                >
                  {summary}
                </Text>
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
