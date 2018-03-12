import { Selector } from 'testcafe';
import { BASE_URL } from './environment';

fixture('App').page(BASE_URL);

test('should have correct heading on home page', async (t) => {
  // Must use promises (async / await  here) for communication with the browser.
  const h1 = await new Selector('body div.container h1');

  await t.expect(h1.innerText).eql('ReactNode');
});
