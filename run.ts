import { chromium } from 'playwright';
import { Reporter } from './report';
import { loginPage } from './pages/loginpage';
import { basicDetailsPage } from './pages/basicDetailsPage';
import { exportDetailsPage } from './pages/exportDetailsPage';
import { myProductsPage } from './pages/myProductsPage';
import { locationPage } from './pages/locationPage';
import { summaryPage } from './pages/summaryPage';

(async () => {

  // Launch browser once and keep it open for all pages
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1500, height: 1080 });
  console.log('Browser Launched Successfully');

  // Create reporter instance to track all steps across all pages
  const reporter = new Reporter();

  try {

    // Run all pages in sequence on the same browser session
    await loginPage(page, reporter);
    await basicDetailsPage(page, reporter);
    await exportDetailsPage(page, reporter);
    await myProductsPage(page, reporter);
    await locationPage(page, reporter);
    await summaryPage(page, reporter);

  } catch (e) {

    // If any unexpected error occurs log it and add to report
    console.error('Script failed with error: ' + String(e));
    reporter.push('Unexpected Script Error', 'FAIL', '0ms', String(e));

  } finally {

    // Always generate and send report regardless of pass or fail
    try {
      await reporter.sendReport(
        'Supplier Onboarding Test Report',
        'onboarding-report.html'
      );
    } catch (reportError) {
      // If email fails the report is still saved locally
      console.error('Email failed but report saved locally: ' + String(reportError));
    }

    // Always close the browser at the end
    try {
      await browser.close();
      console.log('Browser Closed Successfully');
    } catch (e) {
      console.log('Browser was already closed');
    }
  }

})();