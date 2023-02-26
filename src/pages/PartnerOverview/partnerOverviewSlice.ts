import axios from 'axios';
import { createAsyncThunk, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CONFIG } from '../../shared/config';

import { DefaultState } from '../../shared/models/defaultState';
import { Status } from '../../shared/enums/status';
import { Partner } from '../../shared/models/partner';
import { ApiGetResponse, get, post, SyncResponse } from '../../services/requestService';
import { notify } from '../../components/Notification/Notification';
import i18next from 'i18next';
import { partnerSyncInfo } from './PartnerSyncInfo';

export const getPartners = createAsyncThunk<
  { items: Partner[]; totalCount: number },
  { limit?: number; offSet?: number },
  {}
>('partners/getAll', async ({ limit = 10, offSet = 1000 }, { signal }) => {
  const source = axios.CancelToken.source();
  signal.addEventListener('abort', () => {
    source.cancel();
  });

  const {
    data: { items, totalCount },
  } = await get<ApiGetResponse>(`${CONFIG.API_ROUTES.partners}Limit=${limit}&Offset=${offSet}`, {
    cancelToken: source.token,
  });

  return { items, totalCount };
});

export type SyncInfo = SyncResponse;

export const syncPartners = createAsyncThunk<SyncInfo>('partners/sync', async (_, { dispatch, getState }) => {
  const { data } = await post<SyncResponse>(CONFIG.API_ROUTES.partnersSync);

  const {
    partners: {
      pageInfo: { pageIndex, pageSize },
    },
  } = getState() as RootState;

  dispatch(getPartners({ limit: pageSize, offSet: pageSize * pageIndex }));

  return data;
});

interface PartnerOverviewState extends DefaultState {
  partners: Partner[];
  totalCount: number;
  syncInfo: SyncInfo | null;
  pageInfo: {
    pageSize: number;
    pageIndex: number;
  };
}

const initialState: PartnerOverviewState = {
  partners: [],
  totalCount: 0,
  status: Status.IDLE,
  error: null,
  syncInfo: null,
  pageInfo: {
    pageSize: 10,
    pageIndex: 0,
  },
};

export const partnerOverviewSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPageInfo: (state, { payload }) => {
      state.pageInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartners.fulfilled, (state, { payload: { items: partners, totalCount }, meta, type }) => {
        state.status = Status.RESOLVED;
        state.partners = partners;
        state.totalCount = totalCount;
      })
      .addCase(getPartners.pending, (state, action) => {
        state.status = Status.PENDING;
      })
      .addCase(getPartners.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
      })
      .addCase(syncPartners.fulfilled, (state, { payload }) => {
        state.syncInfo = payload;
        state.status = Status.RESOLVED;
        notify({
          message: i18next.t('success.sync.partners.end.message'),
          description: partnerSyncInfo(payload),
          status: 'success',
        });
      })
      .addCase(syncPartners.pending, (state, _) => {
        state.status = Status.PENDING;
        notify({
          message: i18next.t('info.sync.partners.start.message'),
          description: i18next.t('info.sync.partners.start.description'),
          status: 'info',
          duration: 1500,
        });
      })
      .addCase(syncPartners.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
        notify({
          message: i18next.t('error.sync.partners.message'),
          description: i18next.t('error.sync.partners.description'),
          status: 'error',
        });
      });
  },
});

export const { setPageInfo } = partnerOverviewSlice.actions;

export const partnersSelector = ({ partners }: RootState) => partners;

export const partnersOverviewSelector = createDraftSafeSelector(partnersSelector, ({ partners, totalCount }) => {
  return {
    partners: partners.map(({ id, name, website, categories, isPublished }) => ({
      id,
      name,
      website,
      categories: categories.map(({ name }) => name),
      isPublished,
    })),
    totalCount,
  };
});

export default partnerOverviewSlice.reducer;
