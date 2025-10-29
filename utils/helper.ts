import { Page } from '@playwright/test';

export async function takeScreenshot(page: Page, pickleName: string, path: string): Promise<Buffer> {
  const name = `${pickleName.replaceAll(/\s+/g, '_')}_${Date.now()}.png`;
  return await page.screenshot({ path: `./test-results/screenshots/${path}/${name}`, type: 'png' });
}
