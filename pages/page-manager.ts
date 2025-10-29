import { Page } from '@playwright/test';
import { FormulaBuilder } from './formula-builder';

export class PageManager {
  private readonly page: Page;
  private _formulaBuilderPage: FormulaBuilder | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  // Lazy loading pattern to instantiate pages only when accessed
  public get formulaBuilderPage(): FormulaBuilder {
    if (!this._formulaBuilderPage) {
      this._formulaBuilderPage = new FormulaBuilder(this.page);
    }
    return this._formulaBuilderPage;
  }

  public cleanup(): void {
    this._formulaBuilderPage = null;
  }
}
