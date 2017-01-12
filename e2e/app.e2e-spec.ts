import { SapesPage } from './app.po';

describe('sapes App', function() {
  let page: SapesPage;

  beforeEach(() => {
    page = new SapesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
