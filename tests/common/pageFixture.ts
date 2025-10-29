import { PageManager } from '@/pages/page-manager';
import { Page } from '@playwright/test';
import { Logger } from 'winston';

export const pageFixture = {
  page: undefined as unknown as Page,
  logger: undefined as unknown as Logger,
  pageManager: undefined as unknown as PageManager
};
