import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HotelDetailsPage extends BasePage{
    readonly continueButton: Locator;

    constructor(page: Page){
        super(page);

        this.continueButton = this.page.locator('.ProgressbarNavigation__summaryButton button');
    }
}