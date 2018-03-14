import { PropertyPortalUiPage } from './app.po';

describe('property-portal-ui App', () => {
  let page: PropertyPortalUiPage;

  beforeEach(() => {
    page = new PropertyPortalUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
