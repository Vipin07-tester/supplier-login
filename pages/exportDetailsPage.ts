import { Page } from 'playwright';
import { Reporter } from '../report';
import { EXPORT_DETAILS } from '../config';

export async function exportDetailsPage(page: Page, reporter: Reporter) {

  // Start export details page execution
  console.log('EXPORT DETAILS PAGE - Started');
  let t = Date.now();

  // Select yes or no from do you export dropdown
  try {
    t = Date.now();
    const exportValue = EXPORT_DETAILS.doesExport === 'Yes' ? '1: true' : '2: false';
    await page.selectOption('select[formcontrolname="export"]', { value: exportValue });
    await page.waitForTimeout(1000);
    reporter.push('Select Do You Export', 'PASS', `${Date.now() - t}ms`, EXPORT_DETAILS.doesExport);
  } catch (e) {
    reporter.push('Select Do You Export', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // If export is yes then fill iec code, select countries and fob port
  if (EXPORT_DETAILS.doesExport === 'Yes') {

    // Fill IEC certificate code in text input
    try {
      t = Date.now();
      await page.fill('input[formcontrolname="IECCode"]', EXPORT_DETAILS.iecCode);
      reporter.push('Fill IEC Certificate Code', 'PASS', `${Date.now() - t}ms`, EXPORT_DETAILS.iecCode);
    } catch (e) {
      reporter.push('Fill IEC Certificate Code', 'FAIL', `${Date.now() - t}ms`, String(e));
    }

    // Select multiple export countries one by one from dropdown
    try {
      t = Date.now();
      for (const country of EXPORT_DETAILS.exportCountries) {

        // Open country dropdown and search for the country
        await page.click('button[data-bs-toggle="dropdown"][title="Select country"]');
        await page.waitForTimeout(500);
        const searchInput = page.locator('.dropdown-menu input[type="search"], .bs-searchbox input');
        await searchInput.fill(country);
        await page.waitForTimeout(500);

        // Click on the matching country from dropdown list
        await page.click(`.dropdown-menu .dropdown-item:has-text("${country}")`);
        await page.waitForTimeout(300);
        console.log('Added export country: ' + country);
      }

      // Close the dropdown after selecting all countries
      await page.keyboard.press('Escape');
      reporter.push('Select Export Countries', 'PASS', `${Date.now() - t}ms`, EXPORT_DETAILS.exportCountries.join(', '));
    } catch (e) {
      reporter.push('Select Export Countries', 'FAIL', `${Date.now() - t}ms`, String(e));
    }

    // Select FOB port from ng-select dropdown
    try {
      t = Date.now();
      await page.click('ng-select[formcontrolname="fobExportPort"]');
      await page.waitForTimeout(500);
      await page.click(`.ng-option:has-text("${EXPORT_DETAILS.fobPort}")`);
      reporter.push('Select FOB Port', 'PASS', `${Date.now() - t}ms`, EXPORT_DETAILS.fobPort);
    } catch (e) {
      reporter.push('Select FOB Port', 'FAIL', `${Date.now() - t}ms`, String(e));
    }

  } else {
    // If export is no then skip iec code countries and fob port fields
    reporter.push('IEC Code, Countries, FOB Port', 'PASS', '0ms', 'Skipped - Export is No');
  }

  // Click next button to move to my products page
  try {
    t = Date.now();
    await page.locator('//div[@class="text-end main_btn mt-4"]//button[@class="btn btn-success ms-2 ng-star-inserted"]').click();
    await page.waitForTimeout(2000);
    reporter.push('Click Next - Export Details', 'PASS', `${Date.now() - t}ms`);
  } catch (e) {
    reporter.push('Click Next - Export Details', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Export details page execution completed
  console.log('EXPORT DETAILS PAGE - Completed');
}