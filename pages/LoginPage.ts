import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";

export class LoginPage {

  //1. page locators/page objects/OR
  //We have to maintain Encapsulation to protect data so it cannot be accessed outside class

  //Every page will have its own page reference coming from Page 
  //Page provides methods to interact with a single tab in a Browser
  private readonly page: Page;  //Import page above import { Page } from "@playwright/test";
  private readonly elementUtil: ElementUtil;
  private readonly emailId: Locator; //Import Locator above import { Locator, Page } from "@playwright/test";
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly warningMsg: Locator;
  private readonly warningMsgInvalidAttemptsExceed: Locator;
  private readonly registerlink: Locator;


  //2. LoginPage class constructor 
  //Whenever we create constructor we give page : Page
  //then page is given to page reference created above  
  constructor(page: Page) {
    this.page = page;      //current class properties are accessed by this keyword
    this.elementUtil = new ElementUtil(page); //The moment I create the object of ElementUtil class , it asks for page class reference
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });   //Locators are defined in page class only are not sent by test class
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.warningMsg = page.getByText('Warning: No match for E-Mail Address and/or Password.', { exact: true });
    //this.warningMsgInvalidAttemptsExceed=page.locator(`#account-login > div.alert`);
    this.warningMsgInvalidAttemptsExceed= page.getByText('Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.', { exact: true });
    this.registerlink = page.getByText('Register', { exact: true });
  }

  //3. page actions/page methods  : Define the behaviour of the page


  /**
   * This is Naviagtion method
   */
  async goToLoginPage(baseURL : string | undefined) {
    await this.page.goto(baseURL+'?route=account/login');
  }

  /**
   * This methods login to app using username & password 
   * @param email 
   * @param password 
   * @returns 
   */
  async doLogin(email: string, password: string): Promise<HomePage> {
    /*    await this.emailId.fill(email);   //This is ugly way of writing code as using .fill everytime
       await this.password.fill(password); //This is ugly way of writing code as using .fill everytime
       await this.loginBtn.click();  //This is ugly way of writing code as using .click everytime */

    //We will use ElementUtil utility methods
    //Import the ElementUtil class & create its reference under Locators
    //Create an object of ElementUtil class in constructor and provide page reference
    //Now we can access the methods of ElementUtil class

    await this.elementUtil.fill(this.emailId, email);
    await this.elementUtil.fill(this.password, password);
    await this.elementUtil.click(this.loginBtn, { force: true, timeout: 5000 });
    /* const pageTitle =  await this.page.title(); 
    console.log(`Home page title:::  ${pageTitle}`);
     return pageTitle;   //We will return the title of Home page after login  */
    return new HomePage(this.page);    //make sure to import import {HomePage} from "../pages/HomePage";
  }

  /**
   * 
   * @returns getText() returns the error message when user enters incorrect username & password
   * getText() returns the warning message for Account locked due to repeated failures
   */
  async getInvalidLoginMsg(): Promise<string | null> {
    if(await this.elementUtil.isVisible(this.warningMsg)){
    const errorMsg=  await this.elementUtil.getInnerText(this.warningMsg);
    console.log('Inavlid Error message'+errorMsg);
    return errorMsg;
    }
   // Account locked due to repeated failures
    else if(await this.elementUtil.isVisible(this.warningMsgInvalidAttemptsExceed)){
    const warningMsgAttemptsExceeded= await this.elementUtil.getInnerText(this.warningMsgInvalidAttemptsExceed);
    console.log("Warning message for invalid attempts exceed" +warningMsgAttemptsExceeded);
    return warningMsgAttemptsExceeded;
    }
   /*  const errorMsg = await this.elementUtil.getText(this.warningMsg);
    console.log("Invalid error message" + errorMsg);
    return errorMsg;
 */
   return null;   //return null; // no message for undefined
  }

   async navigateToRegisterPage(): Promise<RegisterPage> {  //Return the landing page in Promise as well 
        await this.elementUtil.click(this.registerlink, { force: true }, 1);
           /*  const register =   this.page.getByText('Register', { exact: true }).nth(1);
            console.log(await register.isVisible({ timeout: 10000 }));
           await register.click(); */
        return new RegisterPage(this.page);  //Return the landing page reference with new page 
    }



}