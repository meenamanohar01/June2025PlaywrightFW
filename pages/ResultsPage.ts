import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { LoginPage } from "../pages/LoginPage"
import { ProductInfoPage } from "../pages/ProductInfoPage"

//On Results page we want to verify that search is successfully done or not 
//We can check this my validating if searchresult count >0
export class ResultsPage {

  //Every Page class will have 3 things --Locators,Constructor,Action methods
  //1. page locators/page objects/OR
  //Every page will have its own page reference coming from Page 
  //Page provides methods to interact with a single tab in a Browser
  private readonly page: Page;
  private readonly elementUtil;
  private readonly results: Locator;

  //Results Page constructor 
  //Whenever we create constructor we give page : Page
  //then page is given to page reference created above  
  constructor(page: Page) {
    this.page = page;    //current class properties are accessed by this keyword
    this.elementUtil = new ElementUtil(page);  //The moment I create the object of ElementUtil class , it asks for page class reference
    //this.results = page.locator(`//div[@class='product-thumb']`);
    this.results = page.locator('.product-thumb');
  }

  //3. page actions/page methods  : Define the behaviour of the page
  //We will write a method to check how many results are displayed for particular search 
  //We need to take a locator that represents multiple elements means common locator for all the products displayed after search 

  //3. page actions:
  async getSearchResultCount(): Promise<number> {
    let resultsCount = await this.results.count();
    console.log('Total Number of available Products : ' + resultsCount);
    return resultsCount;
  }

  async selectProduct(productName: string): Promise<ProductInfoPage> {
    console.log("Product to Select" + productName);
    await this.elementUtil.click(this.page.getByRole('link', { name: `${productName}` }));
    return new ProductInfoPage(this.page);

  }
}














