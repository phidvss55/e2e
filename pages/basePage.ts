import { expect, Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private base_url: string = '';
  private username: string = '';
  private password: string = '';
  private environment: string = '';

  private readonly locator = {
    username: '#username',
    password: '#password'
  };

  private loadChorusConfig(): {
    base_url: string;
    username: string;
    password: string;
    environment: string;
  } {
    const envConfig = path.resolve(process.cwd(), 'playwright.env.json');
    let config: {
      base_url?: string;
      username?: string;
      password?: string;
      environment?: string;
    } = {};

    if (fs.existsSync(envConfig)) {
      try {
        config = JSON.parse(fs.readFileSync(envConfig, 'utf-8'));
      } catch (exception) {
        console.warn('Cannot parse playwright.env.json:', exception);
      }
    }

    return {
      base_url: process.env.base_url || config.base_url || '',
      username: process.env.BKM5_USERNAME || config.username || '',
      password: process.env.BKM5_PASSWORD || config.password || '',
      environment: process.env.ENVIRONMENT || config.environment || ''
    };
  }

  public async gotoChorusPage(): Promise<void> {
    const config = this.loadChorusConfig();
    this.base_url = config.base_url;
    this.username = config.username;
    this.password = config.password;
    this.environment = config.environment;

    if (this.environment === 'STG') {
      this.base_url = 'https://chorus-dev.one-line.com';
    }

    await this.page.goto(this.base_url);
    await this.page.fill(this.locator.username, this.username);
    await this.page.fill(this.locator.password, this.password);
    await this.page.click('button:has-text("Sign In")');
    await this.page.waitForTimeout(2000);
  }

  public async reloadPage() {
    await this.page.reload();
  }

  protected async waitUntilElementInVisible(selector: string): Promise<void> {
    let isWaiting = true;
    while (isWaiting) {
      try {
        const elements = await this.page.$$(selector);
        if (elements.length > 0) {
          await this.page.waitForTimeout(500);
        } else {
          isWaiting = false;
        }
      } catch (error) {
        console.error(error);
        continue;
      }
    }
    await this.page.waitForTimeout(200);
  }

  protected async waitUntilLoadingInvisible(): Promise<void> {
    let isWaiting = true;
    while (isWaiting) {
      try {
        const elements = await this.page.$$("//p[text()='Loading...']");
        if (elements.length > 0) {
          await this.page.waitForTimeout(500);
        } else {
          isWaiting = false;
        }
      } catch (error) {
        console.error(error);
        continue;
      }
    }
    await this.page.waitForTimeout(200);
  }

  protected async clickOutside(): Promise<void> {
    await this.page.click('html');
    await this.page.waitForTimeout(500);
  }

  async goto(url: string) {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded'
    });
  }

  async waitAndClick(locator: string) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: 'visible'
    });
    await element.click();
  }

  async navigateTo(link: string) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(link)]);
  }

  async assertTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async assertTitleContains(title: string) {
    const pageTitle = await this.page.title();
    expect(pageTitle).toContain(title);
  }

  async assertURL(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async assertURLContains(title: string) {
    const pageURL = this.page.url();
    expect(pageURL).toContain(title);
  }
}
