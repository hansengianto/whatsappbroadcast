const { Builder, By, Key, until } = require('selenium-webdriver');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const phoneNumbers = [
    '+6281280396980'
];

const text_to_broadcast = 'Subscribe Hansen Gianto On Youtube✔️';

const login = async (driver) => {
    await driver.get('https://web.whatsapp.com/');
    await driver.wait(until.titleContains(') WhatsApp'), 100 * 1000);
    await delay(1000);
}

const sendMessage = async (driver, phoneNumber) => {
    try {
        await driver.get(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${text_to_broadcast}&app_absent=0`);
        await driver.wait(until.titleContains(') WhatsApp'), 100 * 1000);
        await delay(500);
        await driver.findElement(By.xpath('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]')).sendKeys(Key.ENTER);
        await delay(2500);
    } catch (e) {
        console.log(`Failed sending to : ${phoneNumber}`);
    }
}

const finish = async (driver) => {
    await driver.quit();
}

(async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await login(driver);
        for await (const phoneNumber of phoneNumbers) {
            await sendMessage(driver, phoneNumber);
        }
    } finally {
        await finish(driver);
    }
})();
