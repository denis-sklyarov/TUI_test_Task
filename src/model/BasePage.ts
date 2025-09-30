import { Page, type Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    readonly declineDialogButton: Locator;

    constructor(page: Page){
        this.page = page;

        this.declineDialogButton = this.page.locator('#primeForPushDecline');
    }

    //waiting for popup and decline it
    async waitForNotificationPopUp(){
        await this.declineDialogButton.waitFor();
        await this.declineDialogButton.click();
    }
}