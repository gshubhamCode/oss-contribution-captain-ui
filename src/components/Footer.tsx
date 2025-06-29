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
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Footer() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Box
      as="footer"
      position="relative"
      overflow="hidden"
      py={6}
      px={4}
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("gray.100", "gray.800")}
      zIndex={1}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles-footer"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 20 },
            size: { value: 2 },
            color: { value: "#a0aec0" }, 
            links: {
              enable: true,
              color: "#a0aec0",
              distance: 120,
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              outModes: "bounce",
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 140,
                links: {
                  opacity: 0.7,
                },
              },
            },
          },
          }}
          style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          }}
        />


      {/* Content above particles */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={6}
        wrap="wrap"
        position="relative"
        zIndex={1}
      >
        {/* Left: Creator image and about text+links */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={6}
          px={10}
          flex="1"
          justify={{ base: "center", md: "flex-start" }}
          textAlign={{ base: "center", md: "left" }}
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
              mb={{ base: 4, md: 0 }}
            />
          </Box>

          <Box maxW="600px">
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
