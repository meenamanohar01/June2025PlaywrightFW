//import { test, expect } from "@playwright/test";
//import { LoginPage } from '../pages/LoginPage';
//import { HomePage } from "../pages/HomePage";
import { ResultsPage } from "../pages/ResultsPage";

import {test, expect} from "../fixtures/basefixtures"


//data provider for product search key and results count
let searchData = [
  { searchkey: 'macbook', resultscount: 3 },
  { searchkey: 'samsung', resultscount: 2 },
  { searchkey: 'imac', resultscount: 1 },
  { searchkey: 'canon', resultscount: 1 },
  { searchkey: 'Dummy', resultscount: 0 },

];

//Put the complete test inside for loop
//Append the ${product.searchKey} inside the test name as test needs to be executed for 5 different objects in an array 
// Put the test name in back tick as we are using ${placeholder}
for (let product of searchData) {
  test(`verify product search ${product.searchkey}`, async ({ homePage }) => {

    //This is based on AAA pattern 
    //Each test should be independent as per SPR
    /* let loginPage = new LoginPage(page);  //Arrange : Login page object created so arrangement done
    await loginPage.goToLoginPage();    //As goToLoginPage() is retruning Promise so I need await     //This is Action
    let homePage: HomePage = await loginPage.doLogin('pwtest@nal.com', 'test123'); */
    
    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    const productCount = await resultsPage.getSearchResultCount();
    console.log(`Product Count coming from test method ::: ${productCount}`);
    expect(await resultsPage.getSearchResultCount()).toBe(product.resultscount);

  });

}












