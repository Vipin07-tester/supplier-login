import { Page } from 'playwright';
import { Reporter } from '../report';
import { PRODUCTS, EXPORT_DETAILS } from '../config';

// Update these values manually before running the script
const PRODUCT_SELECTION = {
  categoryName:    'Bagasse',       // e.g. Rolls
  subCategoryName: 'Bagasse Trays',   // e.g. Paper Non Padded Mailers
  productName:     'Bagasse Meal Tray',        // e.g. Paper Mailers
};

export async function myProductsPage(page: Page, reporter: Reporter) {

  // Start my products page execution
  console.log('MY PRODUCTS PAGE - Started');
  let t = Date.now();

  // Take product details from the first product in products array
  const product = PRODUCTS[0];

  // Step 1 - Select Category by clicking on category radio button
  try {
    t = Date.now();

    // Wait for category page to load and show category items
    await page.waitForSelector('input[type="radio"][name="category"]', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Find the category label that contains the category name text and click its radio button
    const categoryLabel = page.locator('label.labelContainer').filter({
      has: page.locator('h5', { hasText: PRODUCT_SELECTION.categoryName })
    });

    // Click the radio input inside the matching category label
    await categoryLabel.locator('input[type="radio"][name="category"]').click();
    await page.waitForTimeout(1000);

    reporter.push('Select Category - ' + PRODUCT_SELECTION.categoryName, 'PASS', `${Date.now() - t}ms`);
    console.log('Category selected: ' + PRODUCT_SELECTION.categoryName);
  } catch (e) {
    reporter.push('Select Category - ' + PRODUCT_SELECTION.categoryName, 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 2 - Click Next button on category page to move to sub category page
  try {
    t = Date.now();

    // Wait for next button to become enabled after selecting category
    await page.waitForTimeout(1000);

    // Click next button inside category navigator div
    const categoryNextButton = page.locator('.category-navigator button[data-action="next"]');
    await categoryNextButton.waitFor({ state: 'visible', timeout: 5000 });
    await categoryNextButton.scrollIntoViewIfNeeded();
    await categoryNextButton.click();
    await page.waitForTimeout(2000);

    reporter.push('Click Next - Category Page', 'PASS', `${Date.now() - t}ms`);
    console.log('Moved to sub category page');
  } catch (e) {
    reporter.push('Click Next - Category Page', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 3 - Select Sub Category by clicking on sub category radio button
  try {
    t = Date.now();

    // Wait for sub category page to load and show sub category items
    await page.waitForSelector('input[type="radio"][name="subCategory"]', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Find the sub category label that contains the sub category name text
    const subCategoryLabel = page.locator('.category-div label.labelContainer').filter({
      has: page.locator('h5', { hasText: PRODUCT_SELECTION.subCategoryName })
    });

    // Click the radio input inside the matching sub category label
    await subCategoryLabel.locator('input[type="radio"][name="subCategory"]').click();
    await page.waitForTimeout(1000);

    reporter.push('Select Sub Category - ' + PRODUCT_SELECTION.subCategoryName, 'PASS', `${Date.now() - t}ms`);
    console.log('Sub category selected: ' + PRODUCT_SELECTION.subCategoryName);
  } catch (e) {
    reporter.push('Select Sub Category - ' + PRODUCT_SELECTION.subCategoryName, 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 4 - Click Next button on sub category page to move to products page
  try {
    t = Date.now();

    // Wait for next button to become enabled after selecting sub category
    await page.waitForTimeout(1000);

    // Click next button inside sub category navigator div
    const subCategoryNextButton = page.locator('.subcategory-navigator button[data-action="next"]');
    await subCategoryNextButton.waitFor({ state: 'visible', timeout: 5000 });
    await subCategoryNextButton.scrollIntoViewIfNeeded();
    await subCategoryNextButton.click();
    await page.waitForTimeout(2000);

    reporter.push('Click Next - Sub Category Page', 'PASS', `${Date.now() - t}ms`);
    console.log('Moved to products page');
  } catch (e) {
    reporter.push('Click Next - Sub Category Page', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 5 - Select Product by clicking on product checkbox
  try {
    t = Date.now();

    // Wait for products page to load and show product items
    await page.waitForSelector('input[type="checkbox"][name="product"]', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Find the product label that contains the product name text
    const productLabel = page.locator('.category-div label.labelContainer').filter({
      has: page.locator('h5', { hasText: PRODUCT_SELECTION.productName })
    });

    // Click the checkbox inside the matching product label
    await productLabel.locator('input[type="checkbox"][name="product"]').click();
    await page.waitForTimeout(1000);

    reporter.push('Select Product - ' + PRODUCT_SELECTION.productName, 'PASS', `${Date.now() - t}ms`);
    console.log('Product selected: ' + PRODUCT_SELECTION.productName);
  } catch (e) {
    reporter.push('Select Product - ' + PRODUCT_SELECTION.productName, 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 6 - Click Next button on products page to move to product details page
  try {
    t = Date.now();

    // Wait for next button to become enabled after selecting product
    await page.waitForTimeout(1000);

    // Click next button inside product navigator div
    const productNextButton = page.locator('.product-navigator button[data-action="next"]');
    await productNextButton.waitFor({ state: 'visible', timeout: 5000 });
    await productNextButton.scrollIntoViewIfNeeded();
    await productNextButton.click();
    await page.waitForTimeout(2000);

    reporter.push('Click Next - Products Page', 'PASS', `${Date.now() - t}ms`);
    console.log('Moved to product details page');
  } catch (e) {
    reporter.push('Click Next - Products Page', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 7 - Fill monthly production capacity for the selected product
  try {
    t = Date.now();

    // Wait for product details form to load
    await page.waitForSelector('input[formcontrolname="productionPerDay"]', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Fill monthly production capacity input
    const productionInput = page.locator('input[formcontrolname="productionPerDay"]').first();
    await productionInput.scrollIntoViewIfNeeded();
    await productionInput.clear();
    await productionInput.fill(product.monthlyProduction);
    await page.waitForTimeout(500);

    reporter.push('Fill Monthly Production Capacity', 'PASS', `${Date.now() - t}ms`, product.monthlyProduction);
    console.log('Monthly production filled: ' + product.monthlyProduction);
  } catch (e) {
    reporter.push('Fill Monthly Production Capacity', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 8 - Fill minimum order quantity for the selected product
  try {
    t = Date.now();

    // Wait for moq input to be available
    await page.waitForSelector('input[formcontrolname="moq"]', { timeout: 5000 });

    // Fill minimum order quantity input
    const moqInput = page.locator('input[formcontrolname="moq"]').first();
    await moqInput.scrollIntoViewIfNeeded();
    await moqInput.clear();
    await moqInput.fill(product.moq);
    await page.waitForTimeout(500);

    reporter.push('Fill Minimum Order Quantity', 'PASS', `${Date.now() - t}ms`, product.moq);
    console.log('MOQ filled: ' + product.moq);
  } catch (e) {
    reporter.push('Fill Minimum Order Quantity', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 9 - Click Next button on product details page to move to duties tab
  try {
    t = Date.now();
    await page.waitForTimeout(1000);

    // Click next button using exact class from HTML element
    // Using filter to make sure we click Next and not Back button
    const detailsNextButton = page.locator('button.customNext.btn.btn-success.px-5').filter({ hasText: 'Next' });
    await detailsNextButton.waitFor({ state: 'visible', timeout: 5000 });
    await detailsNextButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await detailsNextButton.click();
    await page.waitForTimeout(2000);

    reporter.push('Click Next - Product Details', 'PASS', `${Date.now() - t}ms`);
    console.log('Moved to duties tab');
  } catch (e) {
    reporter.push('Click Next - Product Details', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Step 10 - Fill import duty on duties tab if export is yes otherwise leave blank and move on
  if (EXPORT_DETAILS.doesExport === 'Yes') {
    try {
      t = Date.now();

      // Wait for duties tab to load and show import duty input
      await page.waitForSelector('input[formcontrolname="importDuty"]', { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Fill import duty input
      const dutyInput = page.locator('input[formcontrolname="importDuty"]').first();
      await dutyInput.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await dutyInput.clear();
      await dutyInput.fill(product.importDuty);
      await page.waitForTimeout(500);

      reporter.push('Fill Import Duty', 'PASS', `${Date.now() - t}ms`, product.importDuty);
      console.log('Import duty filled: ' + product.importDuty);
    } catch (e) {
      reporter.push('Fill Import Duty', 'FAIL', `${Date.now() - t}ms`, String(e));
    }
  } else {
    // Import duty is not required when export is set to no so skip it
    reporter.push('Fill Import Duty', 'PASS', '0ms', 'Skipped - Export is No');
    console.log('Import duty skipped - Export is No');
  }

  // Step 11 - Click Next button on duties tab to move to location page
  try {
    t = Date.now();

    // Wait for page to settle before clicking next on duties tab
    await page.waitForTimeout(2000);

    // Scroll to bottom so next button is visible on screen
    await page.keyboard.press('End');
    await page.waitForTimeout(500);

    // Click next button on duties tab using exact class from HTML element
    // Using filter with hasText to avoid clicking Back button which has same class
    const dutiesNextButton = page.locator('button.customNext.btn.btn-success.px-5').filter({ hasText: 'Next' });
    await dutiesNextButton.waitFor({ state: 'visible', timeout: 10000 });
    await dutiesNextButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await dutiesNextButton.click({ force: true });
    await page.waitForTimeout(3000);

    reporter.push('Click Next - Duties Tab', 'PASS', `${Date.now() - t}ms`);
    console.log('Moved to location page');
  } catch (e) {
    reporter.push('Click Next - Duties Tab', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // My products page execution completed
  console.log('MY PRODUCTS PAGE - Completed');
}