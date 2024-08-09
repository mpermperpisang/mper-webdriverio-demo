import { Given, When, Then } from "@wdio/cucumber-js"
import loginPage from "../scenarios/01_web/01_standard_user"

Given("there is ".*" login", async () => {
  await loginPage.getUsername();
  await loginPage.getPassword();
});

When("user try to login", async () => {
  await loginPage.inputUsername();
  await loginPage.inputPassword();
});

Then("validate user .* do to .* page", async (ability, page) => {
  if (ability === 'can') {
    await homePage.validateIsInHomePage();
    await homePage.clickCartIcon();
    await homePage.validateIsInCartPage();
    await homePage.clickHamburgerIcon();
    await homePage.clickLogout();
  } else if (ability === 'cannot') {
    await loginPage.validateLockedOutUserMessage();
  } else {
    throw new Error('There is no ability found');
  }
});
