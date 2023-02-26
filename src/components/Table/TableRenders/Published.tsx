import { FC } from 'react';
import { CheckIcon, CloseIcon } from '../../Icons';
import { Cell } from 'react-table';
import { Flex } from '@chakra-ui/react';
import { ColumnsData } from '../../../shared/models/columnsData';

interface Props {
  cell: Cell<ColumnsData, boolean | undefined>;
}

export const Published: FC<Props> = ({ cell }) => {
  return (
    <Flex w="100%" justifyContent="center">
      {cell.value ? <CheckIcon w="8" h="8" /> : <CloseIcon w="8" h="8" />}
    </Flex>
  );
};
