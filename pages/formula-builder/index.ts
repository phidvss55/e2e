import { Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class FormulaBuilder extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async gotoFormulaBuilderPage(): Promise<void> {
    await this.gotoChorusPage();
  }
}
