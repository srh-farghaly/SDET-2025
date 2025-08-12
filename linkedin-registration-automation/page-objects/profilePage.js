const userData = require('../data/registrationData.json');
class ProfilePage{
    constructor(browser){
        this.browser=browser;
        this.selectors = {
         firstNameInput: 'input#first-name',
         lastNameInput: 'input#last-name',
         continueBtn: 'button#join-form-submit',
         securityCheckTitle: 'h2#challenge-dialog-modal-header'
        };
    }


    async fillProfileInfo(){
        console.log("Filling firstName and LastName fields...");
        await this.browser.waitForElementVisible(this.selectors.firstNameInput);
        await this.browser.setValue(this.selectors.firstNameInput,userData.firstName);
        await this.browser.setValue(this.selectors.lastNameInput,userData.lastName);

    }

    async clickContinue(){
         console.log("Clicking Continue Button...");
         await this.browser.waitForElementVisible(this.selectors.continueBtn)
         await this.browser.click(this.selectors.continueBtn);
    }

    async securityVerification()
    {
        console.log("Checking Security Check is shown...");
        await this.browser.waitForElementVisible(this.selectors.securityCheckTitle);
        await this.browser.assert.containsText(this.selectors.securityCheckTitle,userData.securityCheckText);
    }
}
module.exports=ProfilePage;
