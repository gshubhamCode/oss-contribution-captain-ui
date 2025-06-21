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
  Tooltip,
} from "@chakra-ui/react";
import { generateLabelColorMap } from "../utils/labelColorMap";


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
  const { issueDTO, summary, updatedAt } = issue;

   // Generate color map for labels dynamically
   const allLabels: string[] = (issueDTO.labels || []).map((l: string) => l.toLowerCase());
   const labelColorMap = generateLabelColorMap(allLabels);
 
   const getLabelColor = (label: string): string => {
     return labelColorMap[label.toLowerCase()] || "gray.500";
   };


  return (
    <>
      <Flex mb={6} gap={6} direction={{ base: "column", md: "row" }}>
        {/* Left: Avatar + user */}
        <Flex
          flexShrink={0}
          direction="column"
          alignItems="center"
          width={{ base: "100%", md: "auto" }}
          mb={{ base: 4, md: 0 }}
        >
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
              fontSize="md"
              fontWeight="semibold"
              color={useColorModeValue("gray.700", "gray.200")}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              {issueDTO.user}
            </Text>
          </Link>
        </Flex>

        {/* Middle: Title, issue link, labels */}
        <Box flex="1" minWidth={0}>
  <Tooltip
    label={issueDTO.title}
    hasArrow
    placement="top-start"
    openDelay={300}
  >
    <Heading
      as="h2"
      size="lg"
      isTruncated
      cursor="pointer"
      mb={2}
      maxWidth="100%"
    >
      {issueDTO.title}
    </Heading>
  </Tooltip>

  <Text mb={1} maxWidth="100%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
    <Text as="span" fontWeight="bold" color={textColor}>
      Issue Link:
    </Text>{" "}
    <Link href={issueDTO.url} isExternal color="blue.500" isTruncated>
      {issueDTO.repositoryName}
    </Link>
  </Text>

  <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")} mt={1}>
    GitHub Issue Last updated: {new Date(issueDTO.updatedAt * 1000).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
        hour12: true, // ✅ 12-hour format with AM/PM
      })}
  </Text>

  <Flex wrap="wrap" gap={2} mt={2}>
    {(issueDTO.labels || []).length > 0 ? (
      issueDTO.labels.map((label: string, idx: number) => (
        <Badge
              key={idx}
              colorScheme={getLabelColor(label).split(".")[0]} // extract color family for Chakra badge
              variant="solid"
              borderRadius="full"
              px={2}
              py={0.5}
              fontSize="xs"
            >
          {label}
        </Badge>
      ))
    ) : (
      <Text color={useColorModeValue("gray.500", "gray.400")}>
        No labels
      </Text>
    )}
  </Flex>
</Box>


        {/* Right: Repository details */}
        <Box
          flexShrink={0}
          textAlign="right"
          fontSize={{ base: "md", md: "lg" }}
          color={useColorModeValue("gray.700", "gray.300")}
          whiteSpace="nowrap"
          ml={{ base: 0, md: 4 }}
          minWidth={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
        >
          <Link
            href={issueDTO.repositoryHtmlUrl}
            isExternal
            fontSize={{ base: "sm", md: "md" }}
            _hover={{ textDecoration: "underline" }}
          >
            {issueDTO.repositoryName}
          </Link>
          <Link
            href={issueDTO.repositoryHtmlUrl}
            isExternal
            fontSize={{ base: "sm", md: "md" }}
            _hover={{ textDecoration: "none" }}
          >
            <Text fontSize={{ base: "sm", md: "md" }} mt={1}>
              ⭐ {issueDTO.repository.stargazersCount} | 👀 {issueDTO.repository.subscribersCount} | 🍴{" "}
              {issueDTO.repository.forksCount}
            </Text>
          </Link>
        </Box>
      </Flex>

      <Divider my={5} />

      <Flex mb={4} alignItems="center" gap={2} flexWrap="wrap">
  <Heading as="h3" size="md">
    ✨ AI Generated Summary
  </Heading>
  {updatedAt && (
    <Text
      fontSize="sm"
      color={useColorModeValue("gray.500", "gray.400")}
    >
      Last updated:&nbsp;
      {new Date(updatedAt * 1000).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
        hour12: true, // ✅ 12-hour format with AM/PM
      })}
    </Text>
  )}
</Flex>

      

      {summary?.validJson ? (
        <VStack align="start" spacing={4} color={textColor} mt={2}>
          {summary.main && (
            <Box
              p={4}
              borderRadius="md"
              bg={useColorModeValue("gray.50", "gray.700")}
              w="full"
              boxShadow="sm"
            >
              <Heading size="sm" mb={1}>
                📝 Main request or goal
              </Heading>
              <Text whiteSpace="pre-wrap">{summary.main}</Text>
            </Box>
          )}
          {summary.validationOrRequirement && (
            <Box
              p={4}
              borderRadius="md"
              bg={useColorModeValue("gray.50", "gray.700")}
              w="full"
              boxShadow="sm"
            >
              <Heading size="sm" mb={1}>
                ✅ Validation rules or requirements
              </Heading>
              <Text whiteSpace="pre-wrap">{summary.validationOrRequirement}</Text>
            </Box>
          )}
          {summary.attemptedFixes && (
            <Box
              p={4}
              borderRadius="md"
              bg={useColorModeValue("gray.50", "gray.700")}
              w="full"
              boxShadow="sm"
            >
              <Heading size="sm" mb={1}>
                🧪 Attempted fixes or blockers
              </Heading>
              <Text whiteSpace="pre-wrap">{summary.attemptedFixes}</Text>
            </Box>
          )}
          {summary.otherNotes && (
            <Box
              p={4}
              borderRadius="md"
              bg={useColorModeValue("gray.50", "gray.700")}
              w="full"
              boxShadow="sm"
            >
              <Heading size="sm" mb={1}>
                🗒 Other notes
              </Heading>
              <Text whiteSpace="pre-wrap">{summary.otherNotes}</Text>
            </Box>
          )}
        </VStack>
      ) : (
        <Box
          mt={2}
          p={4}
          bg={useColorModeValue("gray.50", "gray.700")}
          borderRadius="md"
          boxShadow="sm"
        >
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
