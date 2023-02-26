import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { MainContentWrapper } from '../Layout/MainContentWrapper';

export const Spinner = () => {
  return (
    <MainContentWrapper minH="100vh">
      <ChakraSpinner thickness="6px" speed="1.5s" emptyColor="gray.200" color="green.500" w="7rem" h="7rem" />
    </MainContentWrapper>
  );
};
