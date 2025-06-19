import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Link,
  useColorModeValue,
  Flex,
  Badge,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

type Props = {
  issue: any | null;
};

const getLabelColor = (label: string): string => {
  switch (label.toLowerCase()) {
    case "bug":
      return "red";
    case "feature":
      return "green";
    case "good first issue":
      return "purple";
    case "react":
      return "cyan";
    case "angular":
      return "orange";
    case "springboot":
      return "teal";
    default:
      return "gray";
  }
};

const IssueDetails: React.FC<Props> = ({ issue }) => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  if (!issue) {
    return (
      <Text textAlign="center" color={useColorModeValue("gray.500", "gray.400")}>
        No issue selected or no issues match the filters.
      </Text>
    );
  }

  const { issueDTO, summary } = issue;

  return (
    <Box>
      <Flex justifyContent="flex-end" mb={4}>
        <Box textAlign="center">
          <Image
            src={issueDTO.userAvatarUrl}
            alt="avatar"
            boxSize="16"
            borderRadius="full"
            objectFit="cover"
          />
          <Link
            href={issueDTO.userHtmlUrl}
            isExternal
            color="blue.500"
            mt={2}
            display="block"
          >
            {issueDTO.user}
          </Link>
        </Box>
      </Flex>

      <Heading as="h2" size="xl" mb={2}>
        {issueDTO.title}
      </Heading>

      <Text mb={2}>
        <Text as="span" fontWeight="bold" color={textColor}>
          Issue Link:
        </Text>{" "}
        <Link href={issueDTO.url} isExternal color="blue.500">
          {issueDTO.repositoryName}
        </Link>
      </Text>

      {/* Labels as colored, rounded badges */}
      <Flex align="center" mb={4} wrap="wrap" gap={2}>
        <Text as="span" fontWeight="bold" color={textColor} mr={2}>
          Labels:
        </Text>
      {(issueDTO.labels || []).length > 0 ? (
        issueDTO.labels.map((label: string, idx: number) => (
        <Badge
          key={idx}
          colorScheme={getLabelColor(label)}
          variant="solid"
          borderRadius="full"
          px={3}
          py={1}
          fontSize="sm"
        >
          {label}
        </Badge>
        ))
        ) : (
        <Text color={useColorModeValue("gray.500", "gray.400")}>None</Text>
        )}
      </Flex>

      <Heading as="h3" size="md" mt={4} display="flex" alignItems="center" py={5}>
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
      <Text mt={2} color={textColor}>
        {summary}
      </Text>
    </Box>
  );
};

export default IssueDetails;
