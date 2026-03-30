import { expect, Page } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

type Env = 'local' | 'staging' | 'production';

type EnvConfig = {
  env: Env;
  baseUrls: Record<Env, string>;
  credentials: {
    username: string;
    password: string;
  };
};

function loadEnvConfig(): EnvConfig {
  const configPath = path.resolve(__dirname, '../config/env.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf-8')) as EnvConfig;
}

const envConfig = loadEnvConfig();
const ENV: Env = (process.env.ENV as Env) || envConfig.env || 'production';
const baseUrls = envConfig.baseUrls;
const credentials = envConfig.credentials;

export async function goToPage({ page }: { page: Page }) {
  await page.goto(baseUrls[ENV]);
}

export async function login({ page }: { page: Page }) {
  await page.getByRole('link', { name: 'Account' }).click();

  const usernameInput = page.getByRole('textbox', { name: 'Username' });
  await usernameInput.fill(credentials.username);
  await expect(usernameInput).toHaveValue(credentials.username);

  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  await passwordInput.fill(credentials.password);
  await expect(passwordInput).toHaveValue(credentials.password);

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: `Welcome, ${credentials.username}!` })).toBeVisible();
  await expect(page.locator('h2')).toContainText(`Welcome, ${credentials.username}!`);
}
