import test, { expect, Page } from '@playwright/test';
import { CookieConsentDialog } from '../model/CookieConsentDialog';
import { HomePage } from '../model/HomePage';
import { DestinationsPage } from '../model/DestinationsPage';
import { HotelDetailsPage } from '../model/HotelDetailsPage';
import { BookFlightsPage } from '../model/BookFlightsPage';
import { PassengerDetailsPage } from '../model/PassengerDetailsPage';

let page: Page;
let passengerDetailsPage: PassengerDetailsPage;

test.beforeAll(async ({browser}) => {

  page = await browser.newPage();

  const homePage = new HomePage(page);
  
  //opening page
  await homePage.navigateTo();
  await expect(page).toHaveTitle(/TUI.co.uk/);

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

  //continue to hotel details page
  await new DestinationsPage(page).continueToHotel();

  //continue to hotel book flights page
  await new HotelDetailsPage(page).continueButton.click();

  const bookFlightsPage = new BookFlightsPage(page);

  await bookFlightsPage.selectFlight();

  //continue to passenger details page
  await bookFlightsPage.continueToPassengerDetailsButton.click();

  passengerDetailsPage = new PassengerDetailsPage(page);
  
  await passengerDetailsPage.continueToPaymentButton.click();
});

test.afterAll(async () => {
  await page.close();
});

[0,1,2].forEach((id) => {
  test(`Check correct title error message for ${id + 1} passenger`, async () => {
     await expect(await passengerDetailsPage.getTitleErrorMessage(id)).toBe('Please select a title.');
  });

  test(`Check correct first name error message for ${id + 1} passenger`, async () => {
     await expect(await passengerDetailsPage.getFirstNameErrorMessage(id)).toBe('This field is required');
  });

  test(`Check correct last name error message for ${id + 1} passenger`, async () => {
     await expect(await passengerDetailsPage.getLastNameErrorMessage(id)).toBe('This field is required');
  });

  test(`Check correct date of birth error message for ${id + 1} passenger`, async () => {
     await expect(await passengerDetailsPage.getDateOfBirthErrorMessage(id)).toBe('Please use the format DD/MM/YYYY');
  });
});

test(`Check correct address finder error message`, async () => {
     await expect(passengerDetailsPage.addressFinderErrorMessage).toContainText('Please enter an address');
});

test(`Check correct mobile phone error message`, async () => {
     await expect(passengerDetailsPage.mobilePhoneErrorMessage).toContainText('Please enter a valid UK phone number with 11 digits.');
});

test(`Check correct email address error message`, async () => {
     await expect(passengerDetailsPage.emailErrorMessage).toContainText('Please enter a valid email address. e.g. name@email.com.');
});

test(`Check correct important info error message`, async () => {
     await expect(passengerDetailsPage.importantInfoErrorMessage).toContainText("Don't forget to tick the important information box to confirm you've read and understood it.");
});