import axios from 'axios';

describe('WebdriverIO Component Testing', () => {
  it('should be able to render to the DOM and assert', async () => {
    await axios.get('https://api.github.com/users/mapbox').then(browser.pause(50000))
    .then((response) => {
      console.log("data:::::::: " + JSON.stringify(response.data));
    })
  })
})
