import { Page } from 'playwright';
import { Reporter } from '../report';
import { LOGIN } from '../config';

export async function loginPage(page: Page, reporter: Reporter) {

  // Start login page execution
  console.log('LOGIN PAGE - Started');
  let t = Date.now();

  // Navigate to login page and fill credentials then submit
  try {
    t = Date.now();
    await page.goto('https://stage.supplier.pactap.com/auth/login');
    await page.fill('input[type="text"]', LOGIN.email);
    await page.fill('input[type="password"]', LOGIN.password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    reporter.push('Login', 'PASS', `${Date.now() - t}ms`, 'URL: ' + page.url());
  } catch (e) {
    reporter.push('Login', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Login page execution completed
  console.log('LOGIN PAGE - Completed');
}