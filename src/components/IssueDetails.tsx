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
  VStack,
  Divider,
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
  const cardBg = useColorModeValue("white", "gray.800");
  

  if (!issue) {
    return (
      <Text textAlign="center" color={useColorModeValue("gray.500", "gray.400")}>
        No issue selected or no issues match the filters.
      </Text>
    );
  }

  const { issueDTO, summary } = issue;

  return (
<>
    <Flex mb={6} gap={6} direction={{ base: "column", md: "row" }}>
        
    {/* Left column: Avatar + GitHub link */}
    <Flex justifyContent="flex-end" mb={4}>
  <Link
    href={issueDTO.userHtmlUrl}
    isExternal
    display="flex"
    flexDirection="column"
    alignItems="center"
    textDecoration="none" 
    _hover={{ textDecoration: "none" }}
  >
    <Image
      src={issueDTO.userAvatarUrl}
      alt={`${issueDTO.user}'s avatar`}
      boxSize="16"
      borderRadius="full"
      objectFit="cover"
      mb={2}
      boxShadow="md"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
    />
    <Text
      fontSize="md" // slightly larger
      fontWeight="semibold"
      color={useColorModeValue("gray.700", "gray.200")}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
    >
      {issueDTO.user}
    </Text>
  </Link>
</Flex>

  {/* Right column: Title, issue link, and labels */}
  <Box flex="1">
    <Heading as="h2" size="lg" mb={2}>
      {issueDTO.title}
    </Heading>

    <Text mb={1}>
      <Text as="span" fontWeight="bold" color={textColor}>
        Issue Link:
      </Text>{" "}
      <Link href={issueDTO.url} isExternal color="blue.500">
        {issueDTO.repositoryName}
      </Link>
    </Text>

    {/* Labels right below issue link */}
    <Flex wrap="wrap" gap={2} mt={2}>
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
        <Text color={useColorModeValue("gray.500", "gray.400")}>No labels</Text>
      )}
    </Flex>
  </Box>
</Flex>

      <Divider my={5} />

      {/* Summary section */}
      <Heading as="h3" size="md" mb={4} display="flex" alignItems="center">
      ✨ AI Generated Summary
      </Heading>

      {summary?.validJson ? (
        <VStack align="start" spacing={4} color={textColor} mt={2}>
          {summary.main && (
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.700")} w="full" boxShadow="sm">
              <Heading size="sm" mb={1}>📝 Main request or goal</Heading>
              <Text whiteSpace="pre-wrap">{summary.main}</Text>
            </Box>
          )}
          {summary.validationOrRequirement && (
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.700")} w="full" boxShadow="sm">
              <Heading size="sm" mb={1}>✅ Validation rules or requirements</Heading>
              <Text whiteSpace="pre-wrap">{summary.validationOrRequirement}</Text>
            </Box>
          )}
          {summary.attemptedFixes && (
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.700")} w="full" boxShadow="sm">
              <Heading size="sm" mb={1}>🧪 Attempted fixes or blockers</Heading>
              <Text whiteSpace="pre-wrap">{summary.attemptedFixes}</Text>
            </Box>
          )}
          {summary.otherNotes && (
            <Box p={4} borderRadius="md" bg={useColorModeValue("gray.50", "gray.700")} w="full" boxShadow="sm">
              <Heading size="sm" mb={1}>🗒 Other notes</Heading>
              <Text whiteSpace="pre-wrap">{summary.otherNotes}</Text>
            </Box>
          )}
        </VStack>
      ) : (
        <Box mt={2} p={4} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md" boxShadow="sm">
          <Text color={textColor} whiteSpace="pre-wrap">
            {typeof summary?.summaryText === "string"
              ? summary.summaryText
              : JSON.stringify(summary ?? {}, null, 2)}
          </Text>
        </Box>
      )}
      {/* Coming soon label */}
      <Flex mt={6} justifyContent="flex-end">
  <Text
    fontSize="sm"
    color={useColorModeValue("blue.600", "teal.300")}
    fontWeight="semibold"
    bg={useColorModeValue("blue.50", "teal.900")}
    px={3}
    py={1}
    borderRadius="md"
    boxShadow="sm"
    userSelect="none"
  >
    💬 Coming up: AI chat feature!
  </Text>
</Flex>

    </>
  );
};

export default IssueDetails;
