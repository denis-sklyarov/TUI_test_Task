import { BasePage } from './BasePage';
import { Utils } from '../utils/Utils';
import { Locator, Page } from '@playwright/test';
import { Config } from '../config/config';

export class HomePage extends BasePage{
    readonly departureItemSelector: string = 'label button:not([disabled])';
    readonly destinationItemSelector: string = '[data-testid="country-label"] button:not([disabled])';
    readonly availableDepartureDaySelector: string = '.day.available';
    readonly childAgeSelector: string = '[data-testid="select_child-age"]';
    readonly childAgeOptionSelector: string = 'option'

    readonly departureInput: Locator;
    readonly departureItem: Locator;
    readonly doneButton: Locator;
    readonly destinationListButton: Locator;
    readonly destinationItem: Locator;
    readonly availableDepartureDayInput: Locator;
    readonly availableDepartureDay: Locator;
    readonly durationSelect: Locator;
    readonly durationItem: Locator;
    readonly guestsAndRoodInput: Locator;
    readonly nonAdultPlusButton: Locator;
    readonly childAgeSelect: Locator;
    readonly searchButton: Locator;

    constructor(page: Page){
        super(page);

        this.doneButton = this.page.locator('[data-testid="button_done"]');

        //departure elements
        this.departureInput = this.page.locator('[data-testid="input_departure-airport"]');
        this.departureItem = this.page.locator(this.departureItemSelector);

        //destination elements
        this.destinationListButton = this.page.locator('[data-testid="inputIcon_destinations"]');
        this.destinationItem = this.page.locator(this.destinationItemSelector);

        //available departure day elements
        this.availableDepartureDayInput = this.page.locator('[data-testid="input_departure-date"]');
        this.availableDepartureDay = this.page.locator(this.availableDepartureDaySelector);

        //duration elements
        this.durationSelect = this.page.locator('[data-testid="select_duration"]');
        this.durationItem = this.durationSelect.locator('option[aria-disabled="false"]');

        // guests and room elements
        this.guestsAndRoodInput = this.page.locator('[data-testid="input_pax-and-rooms"]');
        this.nonAdultPlusButton = this.page.locator('[aria-label="nonAdults plus"]');
        this.childAgeSelect = this.page.locator(this.childAgeSelector);

        this.searchButton = this.page.locator('[data-testid="search-button"]')
    }

    //opening home page url
    async navigateTo(){
        await this.page.goto(Config.getBaseUrl());
    }

    // waiter helpers
    async waitForDepartureItem(){
        await this.page.waitForSelector(this.departureItemSelector);
    }

    async waitForDestinationItem(){
        await this.page.waitForSelector(this.destinationItemSelector);
    }

    async waitForAvailableDepartureDay(){
        await this.page.waitForSelector(this.availableDepartureDaySelector);
    }

    //selecting random available destination item 
    async selectRandomDestinationItem(){
        await this.waitForDestinationItem();

        await this.selectRandomItem(this.destinationItem); 
    }
    
    //selecting random available departure item 
    async selectRandomDepartureItem(){
        await this.waitForDepartureItem();
        
        await this.selectRandomItem(this.departureItem);
    }

    //selecting random available departure day 
    async selectRandomAvailableDepartureDay(){
        await this.waitForAvailableDepartureDay();
        
        await this.selectRandomItem(this.availableDepartureDay);
    }

    //selecting random available duration 
    async selectRandomDuration(){
        await this.durationItem.waitFor();
        
        await this.selectRandomItem(this.durationItem);
    }

    async chooseRandomChildAge(childNum:number = 0){
        await this.childAgeSelect.waitFor();
        
        //getting child age select by number param
        const select = await this.childAgeSelect.nth(childNum);

        await this.selectRandomItem(select.locator(this.childAgeOptionSelector));
    }

    private async selectRandomItem(item:Locator) {
        const maxValue = await item.count();
        console.log(maxValue);
        const itemToSelect = Utils.getRandomNumber(1, maxValue);
        const text = await item.nth(itemToSelect).innerText();
        console.log(itemToSelect + text);
        await item.nth(itemToSelect).click();
    }
}