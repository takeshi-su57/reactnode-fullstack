import { UserManager, WebStorageStateStore, Log } from 'oidc-client';

export class AuthService {
  static userManager;

  static user;

  constructor(stsAuthroity) {
    Log.logger = console;
    this.setupUserManager(stsAuthroity);
  }

  login = () => this.userManager.signinRedirect();

  logout = () => this.userManager.signoutRedirect();

  register() {
    window.location.href = `${this.userManager.settings.authority}/account/register?returnUrl=${window.location.href}`;
  }

  profile = () => {
    window.location.href = `${this.userManager.settings.authority}/manage/index`;
  };

  isLoggedIn = () => this.user && this.user.access_token && !this.user.expired;

  getAccessToken = () => (this.user ? this.user.access_token : '');

  signoutRedirectCallback = () => this.userManager.signoutRedirectCallback();

  setupUserManager = stsAuthroity => {
    const config = {
      authority: stsAuthroity,
      client_id: 'spa-client',
      redirect_uri: `${window.location.origin}/assets/login-redirect.html`,
      scope: 'openid spa-api profile offline_access',
      response_type: 'id_token token',
      post_logout_redirect_uri: `${window.location.origin}?postLogout=true`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      automaticSilentRenew: true,
      silent_redirect_uri: `${window.location.origin}/assets/silent-renew.html`,
    };
    this.userManager = new UserManager(config);
    this.userManager.getUser().then(user => {
      if (user && !user.expired) {
        this.user = user;
        // this.loadSecurityContext();
      }
    });
    // this.userManager.events.addUserLoaded(args => {
    //   this.userManager.getUser().then(user => {
    //     this.user = user;
    //     // this.loadSecurityContext();
    //   });
    // });
  };
}
