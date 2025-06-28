import React from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Creator from "../assets/creator.png";

export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="footer"
      py={6}
      px={4}
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={6}
        wrap="wrap"
        position="relative"
      >
        {/* Left: Creator image and about text+links side-by-side on desktop */}
        <Flex
          align="center"
          gap={4}
          flex="1"
          justify={{ base: "center", md: "flex-start" }}
        >
          <Image
            src={Creator}
            alt="Creator"
            boxSize="60px"
            borderRadius="full"
            objectFit="contain"
            bg={useColorModeValue("white", "gray.900")}
            p={1}
          />
          <Box textAlign={{ base: "center", md: "left" }} maxW="600px">
            <Text fontSize="sm" mb={1}>
              Created by Shubham Gupta — passionate about simplifying open source
              onboarding for everyone.
            </Text>
            <Flex justify={{ base: "center", md: "flex-start" }} gap={4}>
              <Link
                href="https://github.com/gshubhamCode"
                isExternal
                color="teal.500"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/shubhamgupta-india/"
                isExternal
                color="teal.500"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </Link>
            </Flex>
          </Box>
        </Flex>

        {/* Right: Contact + Copyright */}
        <Box
          textAlign={{ base: "center", md: "right" }}
          pr={isMobile ? 0 : "64px"} // Enough space from the "Back to top" button
        >
          <Text fontSize="sm">© {new Date().getFullYear()} OSCC</Text>
          <Link
            href="mailto:oscc-contact@gmail.com"
            fontSize="sm"
            color="teal.500"
          >
            oscc-contact@gmail.com
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
