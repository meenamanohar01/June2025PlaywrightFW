import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { LoginPage } from "../pages/LoginPage"

export class ProductInfoPage {

    //Every Page class will have 3 things --Locators,Constructor,Action methods
    //1. page locators/page objects/OR
    //Every page will have its own page reference coming from Page 
    //Page provides methods to interact with a single tab in a Browser
    private readonly page: Page;
    private readonly elementUtil: ElementUtil;
    private readonly header: Locator;
    private readonly images: Locator;
    private readonly productMetaData : Locator;
    private readonly productPriceData : Locator;
    private readonly productMap = new Map<string, string |number| null>();


    //ProductInfoPage constructor
    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        this.header = page.locator('h1');  //We have made the locator dynamic so that it can be used for other product info page headers
       //  this.images=page.locator(`div#content img`)
       this.images = page.locator(`//div[@id='content']//ul[@class='thumbnails']/li`);
       this.productMetaData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[1]/li`);
       this.productPriceData=page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[2]/li`);
    }

    //Action methods 

    async getProductHeader(): Promise<string> {
        const header = await this.elementUtil.getInnerText(this.header);
        console.log(`Header of Product Inforpage :: ${header}`);
        return header.trim();
    }

    async getProductImagesCount(): Promise<number> {
        //Before getting the images count we shud wait using waitFor({ state: 'visible'}) so that all images are loaded 
        //Locator.waitFor(options?: {state?: "attached" | "detached" | "visible" | "hidden" | undefined}
        //waitFor() Returns when element specified by locator satisfies the state option.
        await this.elementUtil.waitForElementVisible(this.images);
        const productImagesCount = await this.images.count();
        console.log(`Total number of images for product from POM is ${await this.getProductHeader()} are ${productImagesCount}`);
        return productImagesCount;
    }

 /**
     * 
     * @returns this method is returning complete product information: header, images count, meta data & pricing data
     */
    async getProductDetails(): Promise<Map<string, string|number|null>> {
        this.productMap.set('header', await this.getProductHeader());
        this.productMap.set('imagecount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();

        console.log(`Full product details for product: ${await this.getProductHeader()}`);
        this.printProductDetails();
        return this.productMap;
    }

    private async printProductDetails() {
        for (const [key, value] of this.productMap) {      
            console.log(key, value);
        }
    }





// Brand: Apple
// Product Code: Product 18
// Reward Points: 800
// Availability: Out Of Stock
   private async getProductMetaData() {
        let productMetaData: string[] = await this.productMetaData.allInnerTexts();
        for (let meta of productMetaData) {
            let metadata: string[] = meta.split(':');
            let metaKey = metadata[0].trim();
            let metaValue = metadata[1].trim();

            this.productMap.set(metaKey, metaValue);
        }
    }

// $2,000.00 -- 0th
// Ex Tax: $2,000.00 --1st
  private  async getProductPricingData() {
        let productPricing: string[] = await this.productPriceData.allInnerTexts();
        let productPrice = productPricing[0].trim();
        let productExTax = productPricing[1].split(':')[1].trim();

        this.productMap.set('price', productPrice);
        this.productMap.set('extaxprice', productExTax);
    }



}