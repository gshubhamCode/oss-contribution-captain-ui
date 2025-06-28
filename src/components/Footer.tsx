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
        {/* Left: Creator image and about text+links */}
        <Flex
          align="center"
          gap={6}
          px={10}
          flex="1"
          justify={{ base: "center", md: "flex-start" }}
        >
          <Box
            transition="transform 0.35s ease-in-out"
            _hover={{ transform: "scale(1.25)" }}
          >
            <Image
              src={Creator}
              alt="Creator"
              boxSize="75px"
              borderRadius="full"
              objectFit="contain"
              bg={useColorModeValue("white", "gray.900")}
              p={1}
            />
          </Box>

          <Box textAlign={{ base: "center", md: "left" }} maxW="600px">
            <Text fontSize="sm" mb={1}>
              <Text as="span" fontWeight="bold">
                Shubham Gupta
              </Text>{" "}
              here — full-stack dev by day, weightlifter by… well, also day
              (gotta get my sleep). I build smooth, scalable systems and have a
              borderline obsession with anime. When not coding or lifting, I’m
              all about family time and good vibes. My motto? Making others
              smile is the ultimate cheat code to happiness.
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
          pr={isMobile ? 0 : "64px"}
        >
          <Text fontSize="sm">© {new Date().getFullYear()} OSCC</Text>
          <Link
            href="mailto:info@opencontributioncaptain.com"
            fontSize="sm"
            color="teal.500"
          >
            info@opencontributioncaptain.com
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
