//import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
//import { HomePage } from "../pages/HomePage";
import {test, expect} from "../fixtures/basefixtures"


/*  test('verify valid login', async ({ page }) => {
    
    const loginPage = new LoginPage(page);    
    await loginPage.goToLoginPage();    
    // const actualTitle =  await  loginPage.doLogin('meena.manohar01@gmail.com','Chocalate@12');    ////This is Action
    //  await expect(page).toHaveTitle('My Account');   //Assertion 
    let homepage: HomePage = await loginPage.doLogin('meena.manohar01@gmail.com', 'Chocalate@12');
    expect(await homepage.isUserLoggedIn()).toBeTruthy();
  });   */

/* test('verify valid login', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle('My Account');
}); */

test('verify valid login @login ',
    {
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'US 50 - user can login to app' },
            { type: 'severity', description: 'Blocker' },
            { type: 'owner', description: 'Naveen Khunteta'}
        ]
    }
    , async ({ homePage }) => {
        await expect(homePage.page).toHaveTitle('My Account');
        
});
//In Invalid login we do not need Custome Fixture 
//We need to destructure baseURL coming from playwright.config.ts to be given to goToLoginPage()
//I do not need Custom Fixture in invalid login 
test('verify invalid login', async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page); //Isolated Page instance, created for each test. Pages are isolated between tests due to fixtures.context isolation.
    await loginPage.goToLoginPage(baseURL);
   // await loginPage.doLogin('meena.manohar01@gmail.com', 'test123');
   await loginPage.doLogin('meena.manohar01@gmail.com', 'test123');
    const actualerrorMsg = await loginPage.getInvalidLoginMsg();
    console.log(actualerrorMsg);
    expect(actualerrorMsg).toContain('Warning: No match for E-Mail Address and/or Password.');

});

