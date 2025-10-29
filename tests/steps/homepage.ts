import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../tests/utils/pageFixture';

setDefaultTimeout(60 * 1000);

Given('User navigates to the Homepage', async function () {
  const base_url = process.env.BASE_URL || 'http://localhost:3000';
  await pageFixture.page.goto(base_url);
});

Then('It should show all products', async function () {
  const cards = await pageFixture.page.getByTestId('product-grid');
  await expect(cards).toBeVisible();
  expect(await cards.locator('a').count()).toEqual(8);
});

Then('I could see the Products title', async function () {
  await expect(pageFixture.page.getByTestId('products-title')).toContainText('Products');
});

Then('I could see the page description', async function () {
  await expect(pageFixture.page.getByTestId('page-description')).toContainText('Discover our latest collection');
});

Given('User Navigates to Browserstack Homepage', async function () {
  const base_url = process.env.BASE_URL || 'http://localhost:3000';
  await pageFixture.page.goto(base_url);
});

When('User clicks on product card', async function () {
  await pageFixture.page.getByRole('link', { name: 'Wireless Headphones' }).click();
});

Then('It should lead user to the product details page', async function () {
  await expect(pageFixture.page).toHaveURL(/products/i);

  await pageFixture.page.getByRole('button', { name: 'Add to Cart', exact: true }).click();

  await expect(pageFixture.page.locator('div').filter({ hasText: /^Sign in$/ })).toBeVisible();

  // await browser.close();
});
