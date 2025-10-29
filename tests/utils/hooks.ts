import { After, AfterAll, Before, BeforeAll, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { pageFixture } from './pageFixture';
import fs from 'node:fs';
import { invokeBrowser } from '../../utils/browser-manager';
import { getEnv } from '../../env-files/env';
import { createLogger } from 'winston';
import { options } from '../../utils/logger';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
  context = await browser.newContext({
    recordVideo: {
      dir: 'test-results/videos'
    }
  });
  page = await context.newPage();
  pageFixture.page = page;
});

Before({ tags: 'not @auth' }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: 'test-results/videos'
    }
  });

  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true
  });

  const page = await context.newPage();

  pageFixture.page = page;
  pageFixture.logger = createLogger(options(scenarioName));
});

AfterAll(async function () {
  await pageFixture.page.close();
  await browser.close();
});

After(async function ({ pickle, result }) {
  let videoPath: string = '';
  let img: Buffer = Buffer.from('');
  const path = `./test-results/trace/${pickle.id}.zip`;

  if (result?.status == Status.PASSED) {
    img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png'
    });
    videoPath = await pageFixture.page.video()!.path();
  }

  await context.tracing.stop({ path: path });
  await pageFixture.page.close();
  await context.close();

  if (result?.status == Status.PASSED) {
    await this.attach(img, 'image/png');
    await this.attach(fs.readFileSync(videoPath), 'video/webm');
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
  }
});
