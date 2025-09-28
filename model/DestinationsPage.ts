import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DestinationsPage extends BasePage{
    readonly page: Page;

    readonly continueToHotelButton: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;

        this.continueToHotelButton = this.page.locator('[data-test-id="continue-button"]');
    }

    async continueToHotel(hotelNum: number = 1){
        await this.continueToHotelButton.waitFor();

        //continue to hotel by given number
        await this.continueToHotelButton.nth(hotelNum).click(); 
    }
}