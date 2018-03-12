import { t } from 'testcafe';
export class Browser {
  constructor(baseURL) {
    this.baseUrl = baseURL;
  }
  goTo(urlPath) {
    return t.navigateTo(`${this.baseURL}${urlPath}`);
  }
}
