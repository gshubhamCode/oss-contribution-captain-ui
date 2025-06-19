// components/IssueDetails.tsx
import React from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface IssueDetailsProps {
  issue: any | null;
}

const IssueDetails: React.FC<IssueDetailsProps> = ({ issue }) => {
  if (!issue)
    return (
      <Text textAlign="center" color={useColorModeValue("gray.500", "gray.400")}>
        No issue selected or no issues match the filters.
      </Text>
    );

  return (
    <Box>
      <Flex justifyContent="flex-end" mb={4}>
        <Box textAlign="center">
          <Image
            src={issue.issueDTO.userAvatarUrl}
            alt="avatar"
            boxSize="16"
            borderRadius="full"
            objectFit="cover"
          />
          <Link href={issue.issueDTO.userHtmlUrl} isExternal color="blue.500" mt={2} display="block">
            {issue.issueDTO.user}
          </Link>
        </Box>
      </Flex>

      <Heading as="h2" size="xl" mb={2}>
        {issue.issueDTO.title}
      </Heading>

      <Text mb={2}>
        <Text as="span" fontWeight="bold" color={useColorModeValue("gray.700", "gray.300")}>
          Repository:
        </Text>{" "}
        <Link href={issue.issueDTO.url} isExternal color="blue.500">
          {issue.issueDTO.repositoryName}
        </Link>
      </Text>

      <Text mb={2}>
        <Text as="span" fontWeight="bold" color={useColorModeValue("gray.700", "gray.300")}>
          Labels:
        </Text>{" "}
        {issue.issueDTO.labels?.join(", ") || "None"}
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
        {issue.summary}
      </Text>
    </Box>
  );
};

export default IssueDetails;
