//import { test, expect } from '@playwright/test';
//import { LoginPage } from '../pages/LoginPage';
//import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import {test, expect} from "../fixtures/basefixtures"


const searchproducts = [
    { searchkey: 'macbook', productname: 'MacBook Pro', imagecount: 4 },
    { searchkey: 'macbook', productname: 'MacBook Air', imagecount: 4 },
    { searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1', imagecount: 7 },
    { searchkey: 'samsung', productname: 'Samsung SyncMaster 941BW', imagecount: 1 },
    { searchkey: 'canon', productname: 'Canon EOS 5D', imagecount: 3 }

];

for (let product of searchproducts) {

    test(`verify product Header ${product.productname}`, async ({ homePage }) => {

       /*  let loginPage = new LoginPage(page);

        await loginPage.goToLoginPage();
        let homePage: HomePage = await loginPage.doLogin('meena.manohar01@gmail.com', 'Chocalate@12'); */

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);

        const productInfo: ProductInfoPage = await resultsPage.selectProduct(product.productname);
        const productHeader = await productInfo.getProductHeader();
        console.log(`In test method product header is ${productHeader}`);

        expect(await productInfoPage.getProductHeader()).toBe(product.productname);

    });

};

for (let product of searchproducts) {

    test(`verify product Images ${product.productname} : ${product.imagecount}`, async ({ homePage }) => {

       /*  let loginPage = new LoginPage(page);

        await loginPage.goToLoginPage();
        let homePage: HomePage = await loginPage.doLogin('meena.manohar01@gmail.com', 'Chocalate@12'); */

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

        const productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
        // await page.waitForTimeout(5000);
        expect(await productInfoPage.getProductImagesCount()).toBe(product.imagecount);

    });

};

test(`verify product MetaData `, async ({ homePage }) => {

 /*    let loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    let homePage: HomePage = await loginPage.doLogin('pwtest@nal.com', 'test123'); */

    let resultsPage: ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');

    let actualProductFullDetails = await productInfoPage.getProductDetails();

    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('Brand')).toBe('Apple');
    expect.soft(actualProductFullDetails.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductFullDetails.get('Reward Points')).toBe('800');
    expect.soft(actualProductFullDetails.get('Availability')).toBe('Out Of Stock');

});


test(`verify product Pricing `, async ({ homePage }) => {

   /*  let loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    let homePage: HomePage = await loginPage.doLogin('pwtest@nal.com', 'test123'); */

    let resultsPage: ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');

    let actualProductFullDetails = await productInfoPage.getProductDetails();

    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('price')).toBe('$2,000.00');
    expect.soft(actualProductFullDetails.get('extaxprice')).toBe('$2,000.00');

});

/* test(`verify entire map at once `, async ({ page }) => {

    let loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    let homePage: HomePage = await loginPage.doLogin('pwtest@nal.com', 'test123');

    let resultsPage: ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');

    let actualProductFullDetails = await productInfoPage.getProductDetails();

    const expectedData = new Map<string, string>([
        ['Brand', 'Apple'],
        ['Product Code', 'Product 18'],
        ['Reward Points', '800'],
        ['Availability', 'Out Of Stock'],
        ['price', '$2,000.00'],
        ['extaxprice', '$2,000.00']


    ]);

   
        for (const [key, value] of expectedData) {      
            console.log(key, value);
        }
   

    expect(actualProductFullDetails).toEqual(expectedData);  // Full map comparison

}); */

/*   📌 Step 3 – Assert Entire Map at Once (Optional)

const expectedData = new Map<string, string>([
['Brand', 'Apple'],
['Product Code', 'Product 18'],
['Reward Points', '800'],
['Availability', 'Out Of Stock'],
['Price', '$2,000.00'],
['Ex Tax', '$2,000.00']
]);

expect(metadata).toEqual(expectedData);  // Full map comparison
*/


