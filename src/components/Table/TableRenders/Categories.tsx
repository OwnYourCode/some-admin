import { FC, memo } from 'react';
import { Badge, Stack } from '@chakra-ui/react';
import { Cell } from 'react-table';
import { ColumnsData } from '../../../shared/models/columnsData';

interface Props {
  cell: Cell<ColumnsData, string[] | undefined>;
}

export const Categories: FC<Props> = memo(({ cell }) => (
  <Stack direction="row">
    {cell?.value?.map((v) => (
      <Badge textAlign="center" borderRadius={6} p="0.15em 0.85em" variant="solid" colorScheme="cyan">
        {v}
      </Badge>
    ))}
  </Stack>
));
