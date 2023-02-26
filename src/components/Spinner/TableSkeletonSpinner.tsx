import { FC } from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';

interface TableSkeletonSpinnerProps {
  rowHeight?: string;
}

export const TableSkeletonSpinner: FC<TableSkeletonSpinnerProps> = ({ rowHeight }) => (
  <Stack>
    {Array.from({ length: 10 }, (_, i) => i + 1).map((value, _) => (
      <Skeleton width="790px" key={value} height={rowHeight} />
    ))}
  </Stack>
);

TableSkeletonSpinner.defaultProps = {
  rowHeight: '57px',
};
