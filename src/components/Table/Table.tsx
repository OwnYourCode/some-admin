import { FC, useEffect } from 'react';
import { Table as ChakraTable, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Column, useFlexLayout, usePagination, useTable } from 'react-table';
import { Pagination } from '../Pagination/Pagination';
import { ColumnsData } from '../../shared/models/columnsData';
import { TableSkeletonSpinner } from '../Spinner/TableSkeletonSpinner';

export interface FetchOptions {
  pageIndex: number;
  pageSize: number;
}

interface TableProps {
  columns: Column<ColumnsData>[];
  data: ColumnsData[];
  totalCount: number;
  fetchData: (options: FetchOptions) => void;
  loading?: boolean;
}

export const Table: FC<TableProps> = ({ columns, data, totalCount, fetchData, loading }) => {
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    pageCount,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, hiddenColumns: ['id'] },
      manualPagination: true,
      // TODO: 10 is default page size
      // TODO: it must be controlled if you decide to control page size
      pageCount: Math.ceil(totalCount / 10),
    },
    usePagination,
    useFlexLayout,
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      {/* TODO: need for testing, will delete it later */}
      {/*<code>*/}
      {/*  {JSON.stringify(*/}
      {/*    {*/}
      {/*      pageIndex,*/}
      {/*      pageSize,*/}
      {/*      pageCount,*/}
      {/*      canNextPage,*/}
      {/*      canPreviousPage,*/}
      {/*    },*/}
      {/*    null,*/}
      {/*    2,*/}
      {/*  )}*/}
      {/*</code>*/}

      <ChakraTable variant="striped" colorScheme="blackAlpha" {...getTableProps()}>
        {loading ? (
          <TableSkeletonSpinner />
        ) : (
          <>
            <Thead>
              {headerGroups.map(({ getHeaderGroupProps, headers }) => (
                <Tr {...getHeaderGroupProps()}>
                  {headers.map(({ getHeaderProps, render }) => (
                    <Th textTransform="none" {...getHeaderProps()}>
                      {render('Header')}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);

                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td display="flex" alignItems="center" py="2" {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </>
        )}
      </ChakraTable>

      <Pagination
        canNextPage={canNextPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        pageCount={pageCount}
        previousPage={previousPage}
        setPageSize={setPageSize}
        gotoPage={gotoPage}
      />
    </>
  );
};
