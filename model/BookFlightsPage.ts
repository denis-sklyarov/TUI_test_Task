import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookFlightsPage extends BasePage{
    readonly page: Page;

    readonly selectFlightRadioButton: Locator;
    readonly continueToPassengerDetailsButton: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;

        this.selectFlightRadioButton = this.page.locator('span[class^="AlternativeFlights"] input');
        this.continueToPassengerDetailsButton = this.page.locator('.PriceDiscountBreakDown__continue');
    }

    async selectFlight(flightNum: number = 1){
        await this.selectFlightRadioButton.waitFor();

        //select available flight
        await this.selectFlightRadioButton.nth(flightNum).click(); 
    }
}