import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HotelDetailsPage extends BasePage{
    readonly page: Page;

    readonly continueButton: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;

        this.continueButton = this.page.locator('.ProgressbarNavigation__summaryButton button');
    }
}