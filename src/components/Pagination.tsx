import React, { useState, useEffect } from 'react';
import { Flex, Button, Input, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number | string;
  totalPages: number;
  onPageChange: (page: number) => void;
  showButtons?: boolean; // NEW
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showButtons = true, // default true
}) => {
  const [inputValue, setInputValue] = useState<number | string>(currentPage);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  const parsePage = (val: string | number): number => {
    let num = typeof val === 'string' ? Number(val) : val;
    if (isNaN(num) || num < 1) return 1;
    if (num > totalPages) return totalPages;
    return num;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputValue(val);
    }
  };

  const handleInputBlur = () => {
    const page = parsePage(inputValue);
    setInputValue(page);
    onPageChange(page);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <Flex alignItems="center" gap={2} justifyContent="center" mt={4} flexWrap="wrap">
      {showButtons && (
        <Button
          onClick={() => onPageChange(parsePage(Number(currentPage) - 1))}
          isDisabled={Number(currentPage) <= 1}
          leftIcon={<ArrowBackIcon />}
          colorScheme="gray"
          variant="outline"
        >
          Prev
        </Button>
      )}

      <Text fontSize="sm">
        Page{' '}
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          size="sm"
          width="60px"
          textAlign="center"
          display="inline-block"
          verticalAlign="middle"
          mx={1}
        />{' '}
        / {totalPages}
      </Text>

      {showButtons && (
        <Button
          onClick={() => onPageChange(parsePage(Number(currentPage) + 1))}
          isDisabled={Number(currentPage) >= totalPages}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="gray"
          variant="outline"
        >
          Next
        </Button>
      )}
    </Flex>
  );
};

export default Pagination;
