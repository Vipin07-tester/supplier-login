import { Page } from 'playwright';
import { Reporter } from '../report';

export async function summaryPage(page: Page, reporter: Reporter) {

  // Start summary page execution
  console.log('SUMMARY PAGE - Started');
  let t = Date.now();

  // Wait for summary page to load and verify submit button is visible
  try {
    t = Date.now();
    await page.waitForSelector('button[type="submit"].btn.btn-success:has-text("Submit")', { timeout: 10000 });
    reporter.push('Summary Page Loaded', 'PASS', `${Date.now() - t}ms`, 'URL: ' + page.url());
  } catch (e) {
    reporter.push('Summary Page Loaded', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Take a full page screenshot of summary before submitting
  await page.screenshot({ path: 'onboarding-screenshot.png', fullPage: true });
  reporter.push('Take Screenshot of Summary', 'PASS', '0ms');

  // Click submit button to complete the onboarding process
  try {
    t = Date.now();
    await page.click('button[type="submit"].btn.btn-success:has-text("Submit")');
    await page.waitForTimeout(3000);
    reporter.push('Click Submit', 'PASS', `${Date.now() - t}ms`, 'URL: ' + page.url());
  } catch (e) {
    reporter.push('Click Submit', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Summary page execution completed
  console.log('SUMMARY PAGE - Completed');
}