import { Status } from '../../shared/enums/status';
import { Category } from '../../shared/models/category';
import { DefaultState } from '../../shared/models/defaultState';
import { createAsyncThunk, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { ApiGetResponse, get } from '../../services/requestService';
import { CONFIG } from '../../shared/config';
import { RootState } from '../../app/store';

export const getCategories = createAsyncThunk<{ items: Category[]; totalCount?: number }>(
  'categories/get',
  async () => {
    // TODO: it's hardcoded because of the API required to pass query params
    const limit = 1000;

    const {
      data: { items },
    } = await get<ApiGetResponse>(`${CONFIG.API_ROUTES.categories}Limit=${limit}`);

    return { items };
  },
);

interface CategoriesState extends DefaultState {
  categories: Category[];
  totalCount?: number;
}

const initialState: CategoriesState = {
  categories: [],
  totalCount: 0,
  status: Status.IDLE,
  error: null,
};

export const categoriseSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, { payload: { items: categories } }) => {
        state.status = Status.RESOLVED;
        state.categories = categories;
      })
      .addCase(getCategories.pending, (state) => {
        state.status = Status.PENDING;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = Status.REJECTED;
        state.error = action.error;
      });
  },
});

export const categoriesSelector = ({ categories }: RootState) => categories;

export const categoriesListSelectors = createDraftSafeSelector(categoriesSelector, ({ categories }) => categories);

export default categoriseSlice.reducer;
