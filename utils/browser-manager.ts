import { setDefaultTimeout } from '@cucumber/cucumber';
import { LaunchOptions, chromium, firefox, webkit } from '@playwright/test';

setDefaultTimeout(60 * 1000);

export const invokeBrowser = () => {
  const options: LaunchOptions = {
    headless: process.env.HEADLESS_MODE == 'true'
  };

  const browserType = process.env.BROWSER || 'chrome';
  switch (browserType) {
    case 'chrome':
      return chromium.launch(options);
    case 'firefox':
      return firefox.launch(options);
    case 'webkit':
      return webkit.launch(options);
    default:
      throw new Error('Please set the proper browser!');
  }
};
