import { test as base, expect as baseExpect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

export type RegData = {
  firstName: string;
  lastName: string;
  telephone: string;
  password: string;
  subscribeNewsletter: string;
};

type MyFixtures = {
  regData: RegData[];
  registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({
  regData: async ({}, use) => {
    const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');

    const registrationData: RegData[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    await use(registrationData);
  },

  registerPage: async ({ page, baseURL }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);

    const regPage = await loginPage.navigateToRegisterPage();
    await use(regPage);
  }
});

//export { expect };

// 🔥 FIX: Re-export expect properly
export const expect = baseExpect;
