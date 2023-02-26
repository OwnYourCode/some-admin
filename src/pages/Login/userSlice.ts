import { createAsyncThunk, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../shared/enums/status';
import { DefaultState } from '../../shared/models/defaultState';
import { authService } from '../../services/authService';
import { RootState } from '../../app/store';
import { notify } from '../../components/Notification/Notification';
import i18next from 'i18next';

export const signIn = createAsyncThunk('userInfo/signin', async (_, thunkApi) => {
  try {
    const result = await authService.signin();
    console.log(result);
  } catch (error) {
    debugger;
    notify({ message: i18next.t('error.user.signin') });
  }
});

export const signOut = createAsyncThunk('userInfo/signout', async (_, thunkApi) => {
  try {
    const result = await authService.logout();
    console.log('result', result);
  } catch (error) {
    // TODO: do we need to show these errors ?
    // notify({ message: i18next.t('') });
  }
});

export interface User {
  name: string;
  roles: string[];
  permissions: string[];
  bpPropertyids: string[];
  companyids: string[];
  isAuthenticated: boolean;
}

type AuthenticatedUser = Partial<User>;

interface UserState extends DefaultState {
  userInfo: AuthenticatedUser | null;
}

const InitialUserState: User = {
  isAuthenticated: false,
  bpPropertyids: [],
  companyids: [],
  name: '',
  permissions: [],
  roles: [],
};

const initialState: UserState = {
  userInfo: InitialUserState,
  status: Status.IDLE,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      if (state.userInfo?.roles?.length) {
        state.userInfo.isAuthenticated = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, { payload, meta, type }) => {
        state.status = Status.RESOLVED;
        state.userInfo = payload as any;
      })
      .addCase(signIn.pending, (state, action) => {
        state.status = Status.PENDING;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.status = Status.RESOLVED;
        // TODO: change to reset the whole store
        state.userInfo = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = Status.REJECTED;
      })
      .addCase(signOut.pending, (state, action) => {
        state.status = Status.PENDING;
      });
  },
});

const { setAuthenticatedUser, setIsAuthenticated } = userSlice.actions;

export { setAuthenticatedUser, setIsAuthenticated };

export const userSelector = ({ user }: RootState) => user;

export const isAuthenticatedUserSelector = createDraftSafeSelector(
  userSelector,
  ({ userInfo }) => userInfo?.isAuthenticated,
);

export const userInfoSelector = createDraftSafeSelector(userSelector, ({ userInfo }) => userInfo);

export const userRolesSelector = createDraftSafeSelector(userSelector, ({ userInfo }) => userInfo?.roles ?? []);

export const userPartnerIdsSelector = createDraftSafeSelector(
  userSelector,
  ({ userInfo }) => userInfo?.companyids ?? [],
);

export default userSlice.reducer;
