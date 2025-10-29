import { When } from '@cucumber/cucumber';
import { pageFixture } from './common/pageFixture';

When('I am on the booking page', async function () {
  await pageFixture.pageManager.formulaBuilderPage.gotoFormulaBuilderPage();
});
