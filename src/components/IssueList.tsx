// components/IssueList.tsx
import React from "react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Pagination from "./Pagination"; // Assuming you move Pagination here or keep it local

interface IssueListProps {
  issues: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  pageSize: number;
}

const IssueList: React.FC<IssueListProps> = ({
  issues,
  currentPage,
  totalPages,
  onPageChange,
  selectedIndex,
  setSelectedIndex,
  pageSize,
}) => {
  return (
    <Box
      flexShrink={0}
      w={["90vw", "350px"]}
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
        {issues.map((issue, idx) => {
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
