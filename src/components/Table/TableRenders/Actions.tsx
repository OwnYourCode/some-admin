import { FC } from 'react';
import { Button } from '@chakra-ui/react';
import { DashBoardIcon } from '../../Icons';
import { ROUTE } from '../../../shared/route';
import { Cell } from 'react-table';
import { ColumnsData } from '../../../shared/models/columnsData';
import { RouteLink } from '../../RouteLink/RouteLink';

interface Props {
  cell: Cell<ColumnsData, any>;
}

export const Actions: FC<Props> = ({ cell }) => {
  const address = `${ROUTE.OVERVIEW}/${cell.row.values?.id}`;

  return (
    <RouteLink textDecoration="none !important" to={address}>
      <Button variant="outline" colorScheme="green" leftIcon={<DashBoardIcon />}>
        Dashboard
      </Button>
    </RouteLink>
  );
};
