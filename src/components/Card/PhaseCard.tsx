import { FC } from 'react';
import { Heading, Stack } from '@chakra-ui/react';

interface PhaseCardProps {
  header: string;
  status: PhaseStatus;
}

type PhaseStatus = 'not-started' | 'started' | 'ongoing';

export const PhaseCard: FC<PhaseCardProps> = ({ header, status, children }) => {
  return (
    <Stack marginTop={2} marginBottom="2.5rem">
      <Heading as="h4" size="md">
        {header}
      </Heading>
      <Heading as="h5" size="sm" opacity="0.6" marginTop={2} marginBottom={4}>
        {status === 'not-started' ? 'Not started' : status === 'ongoing' ? 'Ongoing' : ''}
      </Heading>
      {children}
    </Stack>
  );
};
