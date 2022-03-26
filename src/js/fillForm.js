const puppeteer = require('puppeteer');

module.exports = async (userInfo, endpoint) => {
    try {
      // launch Puppeteer and go to Banco Central's "change password" page
      console.log('Launching browser...');
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      console.log(`Going to enpoint: ${endpoint}`);
      await page.goto(endpoint);
  
      // set input values to each input element and submit
      console.log('Filling form...');
      for (const userObj of userInfo) {
        const { username, oldPassword, newPassword} = userObj;
        const index = userInfo.indexOf(userObj);
  
        await page.$eval('#userNameInput', (el, username) => el.value = username, username);
        await page.$eval('#oldPasswordInput', (el, oldPassword) => el.value = oldPassword, oldPassword);
        await page.$eval('#newPasswordInput', (el, newPassword) => el.value = newPassword, newPassword);
        await page.$eval('#confirmNewPasswordInput', (el, newPassword) => el.value = newPassword, newPassword);
  
        const submitButton = await page.$('#submitButton');
        await submitButton.click();
  
        // make sure next iteration will occur only when page is fully loaded
        await page.reload({ waitUntil: 'domcontentloaded' });
      }

      console.log('Closing browser...');
      await browser.close();
      console.log('===== Done =====');
      
    } catch (err) {
      console.error(err);
    }
};