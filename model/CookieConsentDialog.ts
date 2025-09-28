
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CookieConsentDialog extends BasePage{
    readonly acceptButton: Locator;

    constructor(page: Page){
        super(page);
        this.acceptButton = this.page.locator('#cmCloseBanner');
    }

    //clicking accept button on cookies dialog
    async clickAccept(){
        await this.acceptButton.first().click();
    }
}