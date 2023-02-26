import { FC, useCallback } from 'react';
import { Button, Flex } from '@chakra-ui/react';

interface PaginationProps {
  pageCount?: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize?: (pageSize: number) => void;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  pageCount,
  canPreviousPage,
  canNextPage,
  nextPage,
  previousPage,
  gotoPage,
}) => {
  const setNextPage = useCallback(() => {
    nextPage();
  }, [nextPage]);

  const setPrevPage = useCallback(() => {
    previousPage();
  }, [previousPage]);

  const setCurrentPage = useCallback(
    (pageNumber: number) => (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      gotoPage(pageNumber);
    },
    [gotoPage],
  );

  if (!!pageCount) {
    return (
      <Flex mt="4">
        <Button
          onClick={setPrevPage}
          disabled={!canPreviousPage}
          borderRightRadius="none"
          size="sm"
          variant="outline"
          colorScheme="green"
        >
          Previous
        </Button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((value, index) => (
          <Button
            key={value}
            borderRadius="none"
            onClick={setCurrentPage(index)}
            size="sm"
            variant="outline"
            colorScheme="green"
          >
            {value}
          </Button>
        ))}
        <Button
          onClick={setNextPage}
          disabled={!canNextPage}
          borderLeftRadius="none"
          size="sm"
          variant="outline"
          colorScheme="green"
        >
          Next
        </Button>
      </Flex>
    );
  }

  return null;
};

Pagination.defaultProps = {
  pageCount: 5,
};
