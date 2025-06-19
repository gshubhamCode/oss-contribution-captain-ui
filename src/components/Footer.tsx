import React from "react";
import { Box, Flex, Text, Link, useColorModeValue } from "@chakra-ui/react";


const Footer: React.FC = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    
    <Box
      as="footer"
      w="100%"
      p="6"
      bg={bgColor}
      color={useColorModeValue("gray.600", "gray.300")}
    >
      <Flex
        justify="center"      // center horizontally
        align="center"        // center vertically
        gap={8}               // spacing between items
      >
        <Text>&copy; {new Date().getFullYear()} OSS Contribution Helper</Text>
        <Link href="/about" _hover={{ textDecoration: "underline" }}>
          About
        </Link>
        <Link href="/contact" _hover={{ textDecoration: "underline" }}>
          Contact Us
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
