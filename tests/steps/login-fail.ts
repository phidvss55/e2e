import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';

setDefaultTimeout(60 * 1000);

Given('User navigates to the application', async function () {
  const base_url = process.env.BASE_URL || 'http://localhost:3000';
  await pageFixture.page.goto(base_url);
});

Given('User click on the sign in button', async function () {
  await pageFixture.page.getByRole('link', { name: 'Sign in' }).click();
});

Given('User enter the username as {string}', async function (username) {
  await pageFixture.page.getByTestId('email').fill(username);
});

Given('User enter the password as {string}', async function (password) {
  await pageFixture.page.getByTestId('password').fill(password);
});

When('User click on the login button', async function () {
  await pageFixture.page.getByTestId('login-button').click();
  await pageFixture.page.waitForTimeout(2000);
  pageFixture.logger.info('Clicking on the button');
});

Then('Login should be failed', async function () {
  // await pageFixture.page.screenshot({ path: './test-results/login-fail.png' });
  // await pageFixture.page.getByTestId('login-error').waitFor();
  // await expect(pageFixture.page.getByTestId('login-error')).toContainText('Invalid email or password');
  await expect(pageFixture.page.locator('div').filter({ hasText: /^Invalid email or password$/ })).toBeVisible();

  pageFixture.logger.info('Login should be failed');
});
