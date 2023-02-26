import { FC, memo } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

export const MainContentWrapper: FC<FlexProps> = memo(({ children, maxW, ...restProps }) => {
  return (
    <Flex justify="center" align="center" direction="column" {...restProps}>
      <Flex direction="column" maxW={maxW}>
        {children}
      </Flex>
    </Flex>
  );
});
