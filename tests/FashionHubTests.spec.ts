import { test, expect } from '@playwright/test';
import { goToPage, login} from '../playwright-helper/fashion_helper';

test('Login to FashionHub', async ({ page }) => {
  await goToPage({ page });
  await login({ page });
});