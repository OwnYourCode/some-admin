import { FC } from 'react';
import { Box, Stack, Text, StackProps } from '@chakra-ui/react';

interface CardProps extends StackProps {
  headerMessage: string;
}

export const FormCard: FC<CardProps> = ({ children, headerMessage, ...rest }) => {
  return (
    <Stack {...rest} borderRadius="lg" borderWidth="1px" p={4} borderBottomRightRadius="0" borderBottomLeftRadius="0">
      <Text
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
        boxShadow="sm"
        bg="blackAlpha.50"
        fontSize="lg"
        fontWeight="500"
        m="-16px -16px 6px -16px"
        p={3}
        borderBottom="2px solid"
        borderBottomColor="gray.300"
      >
        {headerMessage}
      </Text>
      <Box>{children}</Box>
    </Stack>
  );
};
