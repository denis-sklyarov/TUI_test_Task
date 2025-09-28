import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PassengerDetailsPage extends BasePage{
    readonly page: Page;

    readonly continueToPaymentButton: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;

        this.continueToPaymentButton = this.page.locator('.ContinueButton__continueButtonHandler button');
    }
}