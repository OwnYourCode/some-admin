import { FC, memo, useRef } from 'react';
import { Cell } from 'react-table';
import { Text, Tooltip } from '@chakra-ui/react';
import { ROUTE } from '../../../shared/route';
import { ColumnsData } from '../../../shared/models/columnsData';
import { RouteLink } from '../../RouteLink/RouteLink';
import { useTruncatedTextTooltip } from '../../../hooks/useTruncatedTextTooltip';

interface Props {
  cell: Cell<ColumnsData, string | undefined>;
}

export const Partner: FC<Props> = memo(({ cell }) => {
  const address = `${ROUTE.OVERVIEW}/${cell.row.values?.id}`;
  const ref = useRef<HTMLAnchorElement | null>(null);

  const showTooltip = useTruncatedTextTooltip(ref, cell.value);

  const cellContent = (
    <Text isTruncated>
      <RouteLink ref={ref} color="cyan.600" fontWeight="500" textDecoration="underline" to={address}>
        {cell.value}
      </RouteLink>
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
});
