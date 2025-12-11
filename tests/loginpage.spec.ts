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
    await loginPage.doLogin('meena.manohar01@gmail.com', 'test123');
    const actualMsg = await loginPage.getInvalidLoginMsg();
    console.log(actualMsg);
   // expect(actualerrorMsg).toContain('Warning: No match for E-Mail Address and/or Password.');

    expect(actualMsg).not.toBeNull();

  const expectedMessages = [
    "Warning: No match for E-Mail Address and/or Password.",
    "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
  ];

  expect(expectedMessages).toContain(actualMsg!.trim());

});


//**************Documentation of changes to invalid Login *******************************/
/* expect(actualMsg).not.toBeNull();
Explaination : This line asserts that the message exists, i.e., it must not be null.
Why this is necessary:
Your getInvalidLoginMessage() method returns null if:
No warning message is visible, or
The DOM changed unexpectedly.
This assertion fails the test early if nothing was returned. */

/* expect(expectedMessages).toContain(actualMsg!.trim());
Explaination : actualMsg!
The ! is the TypeScript non-null assertion operator.
You are telling TypeScript:
“I am sure this value is not null at this point.”
Since the previous assertion (not.toBeNull()) already guaranteed this, using ! is safe. */

 /* const expectedMessages = [
    "Warning: No match for E-Mail Address and/or Password.",
    "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
  ];
This creates an array containing all acceptable warning messages.
Why this is needed:
You do not know which warning message will appear in this test.
Instead of writing two separate tests, you consolidate the acceptable outputs. */

/* expect(expectedMessages).toContain(...)
Checks whether the array expectedMessages includes the actual message.
The test will pass if actualMsg.trim() equals either one of the expected messages. */
