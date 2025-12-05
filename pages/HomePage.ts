import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import {LoginPage} from "../pages/LoginPage"
import {ResultsPage} from "../pages/ResultsPage";

export class HomePage{

//Every Page class will have 3 things --Locators,Constructor,Action methods

//1. page locators/page objects/OR
//We have to maintain Encapsulation to protect data so it cannot be accessed outside class

//Every page will have its own page reference coming from Page 
//Page provides methods to interact with a single tab in a Browser
 readonly page : Page; //Import page above import { Page } from "@playwright/test";
private readonly elementUtil;
private readonly logoutLink : Locator;
private readonly accountLogoutMsg : Locator;
private readonly loginLink : Locator;
private readonly search : Locator;
private readonly searchIcon : Locator;

//Home Page constructor 
//Whenever we create constructor we give page : Page
//then page is given to page reference created above  
constructor(page:Page){
this.page=page; //current class properties are accessed by this keyword
this.elementUtil = new ElementUtil(page) ; //The moment I create the object of ElementUtil class , it asks for page class reference
this.logoutLink = page.getByText('Logout', { exact: true });
this.accountLogoutMsg = page.locator(`#content > p`);
this.loginLink=page.getByRole('link', { name: 'Login' });
this.search = page.getByRole('textbox', { name: 'Search' });
this.searchIcon = page.locator(`#search > span.input-group-btn > button.btn`);
}

//3. page actions/page methods  : Define the behaviour of the page

async isUserLoggedIn() : Promise<boolean>{
   const isLogoutVisible = await this.elementUtil.isVisible(this.logoutLink,1)
   console.log(`Is logout link visible :: ${isLogoutVisible}`);
   return isLogoutVisible;
}

async logout() :Promise<LoginPage>{
    await this.elementUtil.click(this.logoutLink,{force:true, timeout:5000}, 1);
    await this.elementUtil.click(this.loginLink,{force: true, timeout:5000},1);
    return new LoginPage(this.page);  //Make sure to import import {LoginPage} from "../pages/LoginPage"
}


//This is additional 
async getAccountLogoutMsg(): Promise<string|null>{
    const accountLogoutMessage  =  await this.elementUtil.getText(this.accountLogoutMsg);
    return accountLogoutMessage;
}

async doSearch(searchKey : string){    //We have to perform a search so we need to provide searck key
 console.log(`Search Key :: ${searchKey}`);
 await this.elementUtil.fill(this.search, searchKey);
 await this.elementUtil.click(this.searchIcon,{force:true,timeout:5000});
 return new ResultsPage(this.page); //On click we are landing on Results page hence retruning the object

}




}