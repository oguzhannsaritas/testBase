import {expect} from "@playwright/test";





export function customWaitForTimeout(time) {

    return new Promise(resolve => setTimeout(resolve, time));
}


export function waitForLoadState(page) {

    return page.waitForLoadState('load');
}


export async function customClick(locator, stepDescription, page, options = {}) {
    try {
        if (!locator) {
            throw new Error(`Locator is undefined at step: ${stepDescription}`);
        }
        console.log(`WAITING FOR ELEMENT TO BE ATTACHED: ${locator}`);
        await locator.waitFor({ state: 'attached', timeout: 5000 }); // timeout eklendi
        console.log(`ELEMENT IS ATTACHED, NOW CLICKING`);
        await locator.click(options);
        console.log(`CLICKED ON ELEMENT: ${locator}`);
    } catch (error) {
        console.error(`ERROR CLICKING ON ELEMENT at step: ${stepDescription} - ${error}`);
        await captureError(page, error, stepDescription);
        throw error;
    }
}



export async function customFill(locator, value, stepDescription, page) {
    try {
        console.log(`WAITING FOR ELEMENT TO BE VISIBLE: ${locator}`);
        await locator.waitFor({ state: 'visible' });
        console.log(`ELEMENT IS VISIBLE, NOW FILLING`);
        await locator.fill(value);
        console.log(`FILLED ELEMENT WITH VALUE: ${value}`);
        const inputValue = await locator.inputValue();
        console.log(`ELEMENT VALUE AFTER FILL: ${inputValue}`);
        expect(inputValue).toBe(value);
    } catch (error) {
        console.error(`ERROR FILLING ELEMENT at step: ${stepDescription} - ${error}`);
        await captureError(page, error, stepDescription);
        throw error;
    }
}





export function customPlaceholder(page, placeholder) {
    try {
        console.log(`FINDING ELEMENT WITH PLACEHOLDER: ${placeholder}`);
        const element = page.locator(`[placeholder="${placeholder}"]`);
        console.log(`FOUND ELEMENT WITH PLACEHOLDER: ${placeholder}`);

        return element;
    } catch (error) {
        console.error(`ERROR FINDING ELEMENT WITH PLACEHOLDER: ${placeholder} - ${error}`);
        throw error;
    }
}


export function customLocator(page, selector, { isText = false } = {}) {
    try {
        let finalSelector = selector;
        if (isText) {
            finalSelector = `text=${selector}`;
        }

        console.log(`FINDING ELEMENT WITH SELECTOR: ${finalSelector}`);
        const element = page.locator(finalSelector);
        console.log(`FOUND ELEMENT WITH SELECTOR: ${finalSelector}`);

        return element;
    } catch (error) {
        console.error(`ERROR FINDING ELEMENT WITH SELECTOR: ${selector} - ${error}`);
        throw error;
    }
}



export function customByText(page, text, options = {}) {
    try {
        console.log(`FINDING ELEMENT WITH TEXT: ${text}`);
        const element = page.getByText(text, options);
        console.log(`FOUND ELEMENT WITH TEXT: ${text}`);

        return element;
    } catch (error) {
        console.error(`ERROR FINDING ELEMENT WITH TEXT: ${text} - ${error}`);
        throw error;
    }
}


export function customByRole(page, role, options = {}) {
    try {
        console.log(`FINDING ELEMENT WITH ROLE: ${role}`);
        const element = page.getByRole(role, options);
        console.log(`FOUND ELEMENT WITH ROLE: ${role}`);

        return element;
    } catch (error) {
        console.error(`ERROR FINDING ELEMENT WITH ROLE: ${role} - ${error}`);
        throw error;
    }
}



//Take a screenshot
global.captureError = async function(page, error, step) {
    console.error(`ERROR OCCURRED AT STEP: ${step} - ${error}`);


    const screenshotPath = `error_${step}.png`;  // We will use it as the file name when uploading to S3
    const screenshotBuffer = await page.screenshot();  // We take the screenshot as buffer

    // Upload screenshot to S3
    try {
        await addPhoto(screenshotBuffer, screenshotPath, 'Error');  // Buffer and filename are used when uploading to S3
    } catch (s3Error) {
        console.error(`Failed to upload screenshot to S3: ${s3Error.message}`);
    }

    throw new Error(`Step: ${step} - ${error.message}`);
}


global.captureSuccess = async function(page, step) {

    const screenshotPath = `success_${step}.png`;
    const screenshotBuffer = await page.screenshot();  // Take screenshot as Buffer

    try {
        await addPhoto(screenshotBuffer, screenshotPath, 'Success');  // S3' downloads
    } catch (s3Error) {
        console.error(`Failed to upload success screenshot to S3: ${s3Error.message}`);
    }
};