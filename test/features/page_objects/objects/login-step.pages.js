const usernameField = $('#user-name')
const passwordField = $('#password')
const lockedOutError = $('//*[text()="Epic sadface: Sorry, this user has been locked out."]')

class LoginPage extends Element {
  async setUsername(user) {
    const username = process.env[`${user}_USERNAME`];
  }

  async setPassword() {
    const username = process.env.PASSWORD;
  }

  async inputUsername() {
    const usernameValue = username // NOTE: perlu ambil dari getUsername(), setelah di setUsername()

    await usernameField.input(usernameValue);
  }

  async inputPassword() {
    const passwordValue = password // NOTE: perlu ambil dari getPassword(), setelah di setPassword()

    await passwordField.input(passwordValue);
  }

  async validateLockedOutUserMessage() {
    await expect(lockedOutError).toBeDisplayed({ timeout: 2500 });
  }
}
