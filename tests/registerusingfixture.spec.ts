import { test, expect } from '../fixtures/registration-fixture';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';


function getRandomEmail(): string {
  return `automation_${Math.random().toString(36).substring(2, 9)}@nal.com`;
}


//This test will bring csv data from fixture using regData
//We need to navigate to the Registration Page for EACH user hence we cannot use regsitration page fixture -registerPage

test.describe('User Registration Suite', () => {

  test('CSV Data Driven Registration', async ({ baseURL, regData, page, browser }) => {

    for (const user of regData) {

      await test.step(`Register user → ${user.firstName}`, async () => {

        const email = getRandomEmail();

     // Create a new incognito browser context.
      const context = await browser.newContext();
      // Create a new page in a pristine context.
      const page = await context.newPage();
        
        // Reset browser state
       //await page.goto(baseURL!);

        // Navigate fresh for EACH user
        
        let loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        let registerPage: RegisterPage = await loginPage.navigateToRegisterPage();


        const isRegistered = await registerPage.registerUser(
          user.firstName,
          user.lastName,
          email,
          user.telephone,
          user.password,
          user.subscribeNewsletter
        );

         expect(isRegistered).toBeTruthy();

        
    });
    } //end of for loop 
  });
});

