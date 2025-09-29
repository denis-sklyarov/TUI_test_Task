import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from 'log4js';
import * as log4js from "log4js";

export class DestinationsPage extends BasePage{
    readonly continueToHotelButton: Locator;
    readonly hotelName: Locator;

     readonly logger: Logger;
  
    constructor(page: Page){
        super(page);
        this.logger = log4js.getLogger();

        this.continueToHotelButton = this.page.locator('[data-test-id="continue-button"]');
        this.hotelName = this.page.locator('[data-test-id="hotel-name"]');
    }

    async continueToHotel(hotelNum: number = 0){
        await this.continueToHotelButton.waitFor();

        //extracting hotel name
        const hotelName:string | null = await this.hotelName.nth(hotelNum).textContent();

        if (hotelName === null){
            throw new Error('Hotel name is null');
        }

        this.logger.debug(`Selected Hotel name ${hotelName}`);

        //continue to hotel by given number
        await this.continueToHotelButton.nth(hotelNum).click(); 
    }
}