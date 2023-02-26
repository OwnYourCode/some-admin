import { Log, User, UserManager } from 'oidc-client';
import { CONFIG } from '../shared/config';
import { notify } from '../components/Notification/Notification';
import i18next from 'i18next';

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: 'https://staging.com/identity',
      client_id: CONFIG.IDENTITY_CLIENT_ID,
      client_secret: CONFIG.IDENTITY_CLIENT_SECRET,
      redirect_uri: `${CONFIG.CLIENT_ROOT}callback`,
      response_type: CONFIG.IDENTITY_RESPONSE_TYPE,
      scope: CONFIG.IDENTITY_SCOPES,
      automaticSilentRenew: true,
      silent_redirect_uri: `${CONFIG.CLIENT_ROOT}silent-renew`,
      response_mode: 'query',
      // this property seems line not working or maybe I do not understand what
      // I have to setup that it works properly
      includeIdTokenInSilentRenew: false,
      // loadUserInfo: false,
    };
    this.userManager = new UserManager(settings);

    this.userManager.events.addSilentRenewError((error) => {
      console.error(`${i18next.t('error.silent.renew')} ${error.message}`);
      notify({
        message: i18next.t('warning.silent.renew.lost.connection.signout.message'),
        description: i18next.t('warning.silent.renew.lost.connection.signout.description'),
        status: 'warning',
      });
    });

    this.userManager.events.addAccessTokenExpired(() => {
      notify({
        message: i18next.t('info.token.expired.signout.message'),
        description: i18next.t('info.token.expired.signout.description'),
        status: 'info',
      });
      this.userManager.signoutRedirect();
      window.location.replace(`${CONFIG.CLIENT_ROOT}signin`);
    });

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public signin(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public signinRedirectCallback(): Promise<User> {
    return this.userManager.signinRedirectCallback();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public signinSilentCallback(): Promise<User | undefined> {
    return this.userManager.signinSilentCallback();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public async isAuthenticated(): Promise<boolean | undefined> {
    const user = await this.getUser();

    return !!user?.access_token;
  }

  public async getAccessToken(): Promise<string | undefined> {
    try {
      const user = await this.getUser();

      return user?.access_token;
    } catch (error) {
      notify({ message: 'Access token issue', description: i18next.t('error.get.user.access.token') });
    }

    return undefined;
  }
}

export const authService = new AuthService();
