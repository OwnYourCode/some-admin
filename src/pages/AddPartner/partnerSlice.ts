import { createAsyncThunk, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { DefaultState } from '../../shared/models/defaultState';
import { AddPartner } from '../../shared/models/addPartner';
import { Status } from '../../shared/enums/status';
import { RootState } from '../../app/store';
import { CONFIG } from '../../shared/config';
import { get, post, deleteReq, put } from '../../services/requestService';
import { Company } from '../../shared/models/company';
import { ApiKey } from '../../shared/models/apiKey';
import { LocationDescriptor, LocationState } from 'history';
import { ROUTE } from '../../shared/route';
import { notify } from '../../components/Notification/Notification';
import i18next from 'i18next';

const mapResponseToCompanies = (data: any[]): Company[] => {
  return data.map(({ Id, Name }) => ({
    id: Id,
    name: Name,
  }));
};

export const submitPartner = createAsyncThunk<
  AddPartner,
  { partner: AddPartner; push(location: LocationDescriptor<LocationState>): void },
  {}
>('partners/submit', async ({ partner, push }, thunkApi) => {
  await post(CONFIG.API_ROUTES.partner, partner);

  push(ROUTE.OVERVIEW);

  return partner;
});

export const getCompanies = createAsyncThunk<Company[]>('companies/get', async () => {
  const {
    data: { Response },
  } = await get(CONFIG.API_ROUTES.companies); // TODO: fix type later, the endpoint can be changes dramatically in the future, so no reason to add types now

  return mapResponseToCompanies(Response);
});

export const getPartnerApiKeys = createAsyncThunk<ApiKey[], string>(
  'partners/partnerId/apiKeys/get',
  async (partnerId) => {
    const { data } = await get<ApiKey[]>(`${CONFIG.API_ROUTES.apiKeys}/${partnerId}/apiKeys`);

    return data;
  },
);

export const updatePartnerApiKey = createAsyncThunk<
  Omit<ApiKey, 'key'>,
  { partnerId: string; apiKeyId: number; name: string }
>('partners/partnerId/apiKeys/put', async ({ partnerId, apiKeyId, name }) => {
  await put(`${CONFIG.API_ROUTES.apiKeys}/${partnerId}/apiKeys/${apiKeyId}`, { name });

  return { id: apiKeyId, name };
});

export const addPartnerApiKey = createAsyncThunk<ApiKey, { partnerId: string; name: string }>(
  'partners/partnerId/apiKeys/post',
  async ({ partnerId, name }, { rejectWithValue }) => {
    try {
      const { data: apiKey } = await post(`${CONFIG.API_ROUTES.apiKeys}/${partnerId}/apiKeys`, { name });

      return apiKey;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deletePartnerApiKey = createAsyncThunk<number, { partnerId: string; apiKeyId: number }>(
  'partners/partnerId/apiKeys/post/delete',
  async ({ partnerId, apiKeyId }) => {
    await deleteReq(`${CONFIG.API_ROUTES.apiKeys}/${partnerId}/apiKeys/${apiKeyId}`);

    return apiKeyId;
  },
);

export const getPartner = createAsyncThunk<any, string>('partners/partnerId/get', async (partnerId) => {
  const { data } = await get(`${CONFIG.API_ROUTES.partner}/${partnerId}`);

  return data;
});

interface PartnerState extends DefaultState {
  partner: AddPartner | null;
  companies: Company[];
  apiKeys: ApiKey[];
}

const initialState: PartnerState = {
  partner: null,
  status: Status.IDLE,
  error: null,
  companies: [],
  apiKeys: [],
};

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitPartner.fulfilled, (state, { payload: partner }) => {
        state.status = Status.RESOLVED;
        state.partner = partner;
      })
      .addCase(submitPartner.pending, (state, action) => {
        state.status = Status.PENDING;
      })
      .addCase(submitPartner.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
      })
      .addCase(getCompanies.fulfilled, (state, { payload: companies }) => {
        state.status = Status.RESOLVED;
        state.companies = companies;
      })
      .addCase(getCompanies.pending, (state, action) => {
        state.status = Status.PENDING;
      })
      .addCase(getCompanies.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
      })
      .addCase(getPartnerApiKeys.fulfilled, (state, { payload: apiKeys }) => {
        state.apiKeys = apiKeys;
        state.status = Status.RESOLVED;
      })
      .addCase(getPartnerApiKeys.pending, (state, action) => {
        state.status = Status.PENDING;
      })
      .addCase(getPartnerApiKeys.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
      })
      .addCase(getPartner.fulfilled, (state, { payload: partner }) => {
        state.status = Status.RESOLVED;
        state.partner = partner;
      })
      .addCase(getPartner.pending, (state, action) => {
        state.status = Status.PENDING;
      })
      .addCase(getPartner.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
      })
      .addCase(updatePartnerApiKey.fulfilled, (state, { payload: apiKey }) => {
        state.apiKeys = state.apiKeys.map((key) => (key.id === apiKey.id ? { ...key, ...apiKey } : key));
        state.status = Status.RESOLVED;
      })
      .addCase(updatePartnerApiKey.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
      })
      .addCase(addPartnerApiKey.fulfilled, (state, { payload: apiKey }) => {
        state.apiKeys.push(apiKey);
        state.status = Status.RESOLVED;
      })
      .addCase(addPartnerApiKey.pending, (state, action) => {
        state.status = Status.PENDING;
      })
      .addCase(addPartnerApiKey.rejected, (state, { error, payload }) => {
        state.status = Status.REJECTED;
        if ((payload as any).errorCode === 209) {
          state.error = (payload as any).message;
          notify({
            message: i18next.t('warning.partner.published.required.message'),
            description: i18next.t('warning.partner.published.required.description'),
            status: 'warning',
          });
        }
      })
      .addCase(deletePartnerApiKey.fulfilled, (state, { payload: apiKeyId }) => {
        state.apiKeys = state.apiKeys.filter(({ id }) => id !== apiKeyId);
        state.status = Status.RESOLVED;
      })
      .addCase(deletePartnerApiKey.rejected, (state, { error }) => {
        state.status = Status.REJECTED;
        state.error = error;
      });
  },
});

export const partnerSelector = ({ partner }: RootState) => partner;

export const partnerInfoSelector = createDraftSafeSelector(partnerSelector, ({ partner }) => partner);

export const partnerContactsSelector = createDraftSafeSelector(partnerSelector, ({ partner }) => partner?.contacts);

export const partnerNameSelector = createDraftSafeSelector(partnerSelector, ({ partner }) => partner?.name);

export const companiesSelector = createDraftSafeSelector(partnerSelector, ({ companies }) => {
  return companies;
});

export const apiKeysSelector = createDraftSafeSelector(partnerSelector, ({ apiKeys }) => apiKeys);

export default partnerSlice.reducer;
