import { Page } from 'playwright';
import { Reporter } from '../report';
import { BASIC_DETAILS } from '../config';

export async function basicDetailsPage(page: Page, reporter: Reporter) {

  // Start basic details page execution
  console.log('BASIC DETAILS PAGE - Started');
  let t = Date.now();

  // Upload company logo using hidden file input
  try {
    t = Date.now();
    await page.locator('input#imageUpload').setInputFiles(BASIC_DETAILS.companyLogoPath);
    await page.waitForTimeout(1000);
    reporter.push('Upload Company Logo', 'PASS', `${Date.now() - t}ms`);
  } catch (e) {
    reporter.push('Upload Company Logo', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Select year of establishment from dropdown
  try {
    t = Date.now();
    await page.click('ng-select[formcontrolname="yearOfEstablishment"]');
    await page.waitForTimeout(500);
    await page.click(`.ng-option:has-text("${BASIC_DETAILS.yearsOfEstablishment}")`);
    reporter.push('Select Years of Establishment', 'PASS', `${Date.now() - t}ms`, BASIC_DETAILS.yearsOfEstablishment);
  } catch (e) {
    reporter.push('Select Years of Establishment', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Select state from ng-select dropdown
  try {
    t = Date.now();
    await page.click('ng-select[formcontrolname="states"]');
    await page.waitForTimeout(500);
    await page.click(`.ng-option:has-text("${BASIC_DETAILS.state}")`);
    reporter.push('Select State', 'PASS', `${Date.now() - t}ms`, BASIC_DETAILS.state);
  } catch (e) {
    reporter.push('Select State', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill city name in text input
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="city"]', BASIC_DETAILS.city);
    reporter.push('Fill City', 'PASS', `${Date.now() - t}ms`, BASIC_DETAILS.city);
  } catch (e) {
    reporter.push('Fill City', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill pin code in text input
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="zipCode"]', BASIC_DETAILS.pinCode);
    reporter.push('Fill Pin Code', 'PASS', `${Date.now() - t}ms`, BASIC_DETAILS.pinCode);
  } catch (e) {
    reporter.push('Fill Pin Code', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill corporation identity number
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="cin_ein"]', BASIC_DETAILS.corporationIdNumber);
    reporter.push('Fill Corporation Identity Number', 'PASS', `${Date.now() - t}ms`);
  } catch (e) {
    reporter.push('Fill Corporation Identity Number', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Select annual turnover value in local currency from dropdown
  try {
    t = Date.now();
    await page.click('ng-select[formcontrolname="annualTurmoverINR"]');
    await page.waitForTimeout(500);
    await page.click(`.ng-option:has-text("${BASIC_DETAILS.annualTurnoverLocal}")`);
    reporter.push('Select Annual Turnover Local', 'PASS', `${Date.now() - t}ms`, BASIC_DETAILS.annualTurnoverLocal);
  } catch (e) {
    reporter.push('Select Annual Turnover Local', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Select annual turnover value in USD from dropdown
  try {
    t = Date.now();
    await page.click('ng-select[formcontrolname="annualTurmoverUSD"]');
    await page.waitForTimeout(500);
    await page.click(`.ng-option:has-text("${BASIC_DETAILS.annualTurnoverUSD}")`);
    reporter.push('Select Annual Turnover USD', 'PASS', `${Date.now() - t}ms`, BASIC_DETAILS.annualTurnoverUSD);
  } catch (e) {
    reporter.push('Select Annual Turnover USD', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill tax id in text input
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="taxId"]', BASIC_DETAILS.taxId);
    reporter.push('Fill Tax ID', 'PASS', `${Date.now() - t}ms`);
  } catch (e) {
    reporter.push('Fill Tax ID', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Click next button to move to export details page
  try {
    t = Date.now();
    await page.click('button.btn.btn-success:has-text("Next")');
    await page.waitForTimeout(2000);
    reporter.push('Click Next - Basic Details', 'PASS', `${Date.now() - t}ms`);
  } catch (e) {
    reporter.push('Click Next - Basic Details', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Basic details page execution completed
  console.log('BASIC DETAILS PAGE - Completed');
}