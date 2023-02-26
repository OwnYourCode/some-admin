import { FC, useCallback, useMemo } from 'react';
import { Divider } from '@chakra-ui/react';
import { Subheader } from '../../components/Subheader/Subheader';
import { Table } from '../../components/Table/Table';
import { Column } from 'react-table';
import { MainContentWrapper } from '../../components/Layout/MainContentWrapper';
import { ColumnsData } from '../../shared/models/columnsData';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getPartners, partnersOverviewSelector, setPageInfo } from './partnerOverviewSlice';
import { Categories } from '../../components/Table/TableRenders/Categories';
import { useTranslation } from 'react-i18next';
import { Published } from '../../components/Table/TableRenders/Published';
import { Partner } from '../../components/Table/TableRenders/Partner';
import { Actions } from '../../components/Table/TableRenders/Actions';
import { Website } from '../../components/Table/TableRenders/Website';

export const PartnerOverview: FC = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      [
        {
          accessor: 'id',
        },
        {
          Header: t('page.overview.table.header.partner'),
          accessor: 'name',
          Cell: (props) => <Partner cell={props.cell} />,
        },
        {
          Header: t('page.overview.table.header.categories'),
          accessor: 'categories',
          Cell: (props, context) => <Categories cell={props.cell} />,
        },
        {
          Header: t('page.overview.table.header.website'),
          accessor: 'website',
          width: 200,
          // collapse: true,
          Cell: (props) => <Website cell={props.cell} />,
        },
        // TODO: it's a part of the second scope
        // {
        //   Header: 'Phase',
        //   accessor: 'phase',
        // },
        // TODO: it's a part of the second scope
        {
          Header: 'Published to MarketPlace?',
          accessor: 'isPublished',
          width: 220,
          align: 'center',
          Cell: (props) => <Published cell={props.cell} />,
        },
        {
          Header: '',
          accessor: 'actions',
          width: 180,
          Cell: (props: any) => <Actions cell={props.cell} />,
        },
      ] as Column<ColumnsData>[],
    [t],
  );

  const { partners, totalCount } = useAppSelector(partnersOverviewSelector);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      dispatch(setPageInfo({ pageSize, pageIndex }));
      dispatch(getPartners({ limit: pageSize, offSet: pageSize * pageIndex }));
    },
    [dispatch],
  );

  return (
    <MainContentWrapper>
      <Subheader placeholder="page.overview.subheader.input.placeholder" />
      <Divider />
      <Table
        loading={!partners.length}
        columns={columns}
        data={partners}
        totalCount={totalCount}
        fetchData={fetchData}
      />
    </MainContentWrapper>
  );
};
