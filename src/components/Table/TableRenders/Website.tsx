import { FC, useRef } from 'react';
import { Cell } from 'react-table';
import { ColumnsData } from '../../../shared/models/columnsData';
import { Text, Tooltip } from '@chakra-ui/react';
import { useTruncatedTextTooltip } from '../../../hooks/useTruncatedTextTooltip';

interface Props {
  cell: Cell<ColumnsData, string | undefined>;
}

export const Website: FC<Props> = ({ cell }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const showTooltip = useTruncatedTextTooltip(ref, cell.value);

  const cellContent = (
    <Text isTruncated>
      <span ref={ref}>{cell.value}</span>
    </Text>
  );

  if (showTooltip) {
    return (
      <Tooltip p="0.5rem" color="black" bg="white" label={cell.value}>
        {cellContent}
      </Tooltip>
    );
  }

  return cellContent;
};
