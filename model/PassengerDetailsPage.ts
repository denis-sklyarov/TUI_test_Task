import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PassengerDetailsPage extends BasePage{
    readonly titleErrorSelector: string = '[class$="Dropdown"] .inputs__errorText';
    readonly firstNameErrorSelector: string = '[class^="PassengerForm__inputTextBox field"][aria-label*="first"] .inputs__errorMessage';
    readonly lastNameErrorSelector: string = 'label[aria-label="surname"] + div span[class^="inputs__errorMessage"]';
    readonly dateOfBirthErrorSelector: string = '.DateInput__fields + span';
    
    readonly addressFinderErrorMessage: Locator;
    readonly mobilePhoneErrorMessage: Locator;
    readonly emailErrorMessage: Locator;
    readonly importantInfoErrorMessage: Locator;
    readonly continueToPaymentButton: Locator;

    constructor(page: Page){
        super(page);

        this.addressFinderErrorMessage = this.page.locator('#paxInfoAddressLookup__errorMessage');
        this.emailErrorMessage = this.page.locator('#paxInfoEmail__errorMessage');
        this.mobilePhoneErrorMessage = this.page.locator('#paxInfoTelephone__errorMessage')
        this.importantInfoErrorMessage = this.page.locator('.ImportantInformation__error_message_red');
        this.continueToPaymentButton = this.page.locator('#PassengerContinueButton__component button');
    }

    //return error message for title field by given passenger index
    async getTitleErrorMessage(index:number = 0): Promise<string | null>{
        return await this.page.locator(this.titleErrorSelector).nth(index).textContent();
    }

    //return error message for first name field by given passenger index
    async getFirstNameErrorMessage(index:number = 0): Promise<string | null>{
        return await this.page.locator(this.firstNameErrorSelector).nth(index).textContent();
    }

    //return error message for last name field by given passenger index
    async getLastNameErrorMessage(index:number = 0): Promise<string | null>{
        return await this.page.locator(this.lastNameErrorSelector).nth(index).textContent();
    }

    //return error message for date of birth field by given passenger index
    async getDateOfBirthErrorMessage(index:number = 0): Promise<string | null>{
        return await this.page.locator(this.dateOfBirthErrorSelector).nth(index).textContent();
    }
}