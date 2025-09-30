import { BasePage } from './BasePage';
import { Utils } from '../utils/Utils';
import { Locator, Page } from '@playwright/test';
import { Config } from '../config/config';
import { Logger } from 'log4js';
import * as log4js from "log4js";

export class HomePage extends BasePage{
    readonly departureItemSelector: string = 'label button:not([disabled])';
    readonly destinationItemSelector: string = '[data-testid="country-label"] button:not([disabled])';
    readonly availableDepartureDaySelector: string = '.day.available';
    readonly childAgeSelector: string = '[data-testid="select_child-age"]';
    readonly childAgeOptionSelector: string = 'option';
    readonly durationItemSelector: string = 'option[aria-disabled="false"]';

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
    
    readonly logger: Logger;

    constructor(page: Page){
        super(page);
        this.logger = log4js.getLogger();

        this.doneButton = this.page.getByTestId('button_done');

        //departure elements
        this.departureInput = this.page.getByTestId('input_departure-airport');
        this.departureItem = this.page.locator(this.departureItemSelector);

        //destination elements
        this.destinationListButton = this.page.getByTestId('inputIcon_destinations');
        this.destinationItem = this.page.locator(this.destinationItemSelector);

        //available departure day elements
        this.availableDepartureDayInput = this.page.getByTestId('input_departure-date');
        this.availableDepartureDay = this.page.locator(this.availableDepartureDaySelector);

        //duration elements
        this.durationSelect = this.page.getByTestId('select_duration');
        this.durationItem = this.durationSelect.locator(this.durationItemSelector);

        // guests and room elements
        this.guestsAndRoodInput = this.page.getByTestId('input_pax-and-rooms');
        this.nonAdultPlusButton = this.page.locator('[aria-label="nonAdults plus"]');
        this.childAgeSelect = this.page.locator(this.childAgeSelector);

        this.searchButton = this.page.getByTestId('search-button')
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

    async waitForDurationItem(){
        await this.page.waitForSelector(this.durationItemSelector);
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
        await this.waitForDurationItem();
        
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
        const itemToSelect = Utils.getRandomNumber(1, maxValue);
        const text = await item.nth(itemToSelect).textContent();
        this.logger.debug(itemToSelect + (text === null ? "text is empty" : text ));
        await item.nth(itemToSelect).click();
    }
}