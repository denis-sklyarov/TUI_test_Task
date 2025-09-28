import test, { expect, Page } from '@playwright/test';
import { CookieConsentDialog } from '../model/CookieConsentDialog';
import { HomePage } from '../model/HomePage';
import { DestinationsPage } from '../model/DestinationsPage';
import { HotelDetailsPage } from '../model/HotelDetailsPage';
import { BookFlightsPage } from '../model/BookFlightsPage';

let page: Page;
let homePage: HomePage;

test.beforeAll(async ({browser}) => {

  page = await browser.newPage();

  homePage = new HomePage(page);
  
  //opening page
  await homePage.navigateTo();

  //accept cookies
  await new CookieConsentDialog(page).clickAccept();

  //handle popup
  await homePage.waitForNotificationPopUp();

  //select random available departure
  await homePage.departureInput.click();
  await homePage.selectRandomDepartureItem();
  await homePage.doneButton.click();

  //select random available destination
  await homePage.destinationListButton.click();
  await homePage.selectRandomDestinationItem();
  await homePage.doneButton.click();

  //select random available destination Departure Day
  await homePage.availableDepartureDayInput.click();
  await homePage.selectRandomAvailableDepartureDay();
  await homePage.doneButton.click();

  //select random available duration
  await homePage.durationSelect.click();
  await homePage.selectRandomDuration();

  //adding guests
  await homePage.guestsAndRoodInput.click();
  await homePage.nonAdultPlusButton.click();
  await homePage.chooseRandomChildAge();
  await homePage.doneButton.click();

  await homePage.searchButton.click();

  await new DestinationsPage(page).continueToHotel();

  await new HotelDetailsPage(page).continueButton.click();

  const bookFlightsPage = new BookFlightsPage(page);

  await bookFlightsPage.selectFlight();
  await bookFlightsPage.continueToPassengerDetailsButton.click();

});

test.afterAll(async () => {
  await page.close();
});

test('TUI testing task', async () => {

  //await page.pause();

  //await page.pause();
  await expect(page).toHaveTitle(/TUI.co.uk/); 
});