import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import partners from '../pages/PartnerOverview/partnerOverviewSlice';
import partner from '../pages/AddPartner/partnerSlice';
import user from '../pages/Login/userSlice';
import categories from '../pages/AddPartner/categoriesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    partners,
    partner,
    user,
    categories,
  },
  middleware:
    process.env.NODE_ENV !== 'production'
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
