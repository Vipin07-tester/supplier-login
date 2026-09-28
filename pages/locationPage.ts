import { Page } from 'playwright';
import { Reporter } from '../report';
import { LOCATION_DETAILS, MACHINE_DETAILS, CERTIFICATE_DETAILS } from '../config';

export async function locationPage(page: Page, reporter: Reporter) {

  // Start location page execution
  console.log('LOCATION PAGE - Started');
  let t = Date.now();

  // Select location type as factory or warehouse from dropdown
  try {
    t = Date.now();
    await page.selectOption('select.form-control.form-ctrl:has(option[value="factory"])', { value: LOCATION_DETAILS.locationType });
    await page.waitForTimeout(1000);
    reporter.push('Select Location Type', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.locationType);
  } catch (e) {
    reporter.push('Select Location Type', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill factory or warehouse area in text input
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="area"]', LOCATION_DETAILS.factoryArea);
    reporter.push('Fill ' + (LOCATION_DETAILS.locationType === 'factory' ? 'Factory' : 'Warehouse') + ' Area', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.factoryArea);
  } catch (e) {
    reporter.push('Fill Area', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Select manpower range from dropdown
  try {
    t = Date.now();
    await page.selectOption('select[formcontrolname="manpower"]', { value: LOCATION_DETAILS.manpower });
    reporter.push('Select Manpower', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.manpower);
  } catch (e) {
    reporter.push('Select Manpower', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Select stuffing permit radio button only if location type is factory
  // Select stuffing permit radio button only if location type is factory
if (LOCATION_DETAILS.locationType === 'factory') {
  try {
    t = Date.now();

    // Wait for stuffing permit radio buttons to load on page
    await page.waitForSelector('input[formcontrolname="isStuffingPermit"]', { timeout: 5000 });
    await page.waitForTimeout(500);

    if (LOCATION_DETAILS.stuffingPermit === 'Yes') {
      // Click yes radio button using exact id from HTML element
      await page.locator("//label[@for='factoryStuffingYes']").click();
    } else {
      // Click no radio button using exact id from HTML element
      await page.locator("//label[@for='factoryStuffingNo']").click();
    }

    await page.waitForTimeout(500);
    reporter.push('Select Stuffing Permit', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.stuffingPermit);
    console.log('Stuffing permit selected: ' + LOCATION_DETAILS.stuffingPermit);
  } catch (e) {
    reporter.push('Select Stuffing Permit', 'FAIL', `${Date.now() - t}ms`, String(e));
  }
} else {
  // Stuffing permit is not applicable for warehouse so skip it
  reporter.push('Select Stuffing Permit', 'PASS', '0ms', 'Skipped - Not applicable for Warehouse');
  console.log('Stuffing permit skipped - Warehouse location type');
}

  // Select palletization capability radio button yes or no
  // Select palletization capability radio button yes or no
try {
  t = Date.now();

  // Wait for palletization radio buttons to load on page
  await page.waitForSelector('input[formcontrolname="isPalletizationCapability"]', { timeout: 5000 });
  await page.waitForTimeout(500);

  if (LOCATION_DETAILS.palletization === 'Yes') {
    // Click yes radio button using exact id from HTML element
    await page.locator("//label[@for='factoryPalletizationYes']").click();
  } else {
    // Click no radio button using exact id from HTML element
    await page.locator("//label[@for='factoryPalletizationNo']").click();
  }

  await page.waitForTimeout(500);
  reporter.push('Select Palletization', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.palletization);
  console.log('Palletization selected: ' + LOCATION_DETAILS.palletization);
} catch (e) {
  reporter.push('Select Palletization', 'FAIL', `${Date.now() - t}ms`, String(e));
}

  // Fill pallet size and cost only if palletization is selected as yes
  if (LOCATION_DETAILS.palletization === 'Yes') {

    // Select pallet size from dropdown
    try {
      t = Date.now();
      await page.selectOption('select[formcontrolname="palleteSize"]', { value: LOCATION_DETAILS.palletSize });
      reporter.push('Select Pallet Size', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.palletSize);
    } catch (e) {
      reporter.push('Select Pallet Size', 'FAIL', `${Date.now() - t}ms`, String(e));
    }

    // Fill per pallet cost in text input
    try {
      t = Date.now();
      await page.fill('input[formcontrolname="PerPalleteCost"]', LOCATION_DETAILS.perPalletCost);
      reporter.push('Fill Per Pallet Cost', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.perPalletCost);
    } catch (e) {
      reporter.push('Fill Per Pallet Cost', 'FAIL', `${Date.now() - t}ms`, String(e));
    }

  } else {
    // Pallet size and cost are not required if palletization is no
    reporter.push('Pallet Size and Cost', 'PASS', '0ms', 'Skipped - Palletization is No');
  }

  // Fill address line 1 in text input
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="addressLine1"]', LOCATION_DETAILS.addressLine1);
    reporter.push('Fill Address Line 1', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.addressLine1);
  } catch (e) {
    reporter.push('Fill Address Line 1', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill address line 2 only if value is provided as it is optional
  if (LOCATION_DETAILS.addressLine2 && LOCATION_DETAILS.addressLine2.trim() !== '') {
    try {
      t = Date.now();
      await page.fill('input[formcontrolname="addressLine2"]', LOCATION_DETAILS.addressLine2);
      reporter.push('Fill Address Line 2', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.addressLine2);
    } catch (e) {
      reporter.push('Fill Address Line 2', 'FAIL', `${Date.now() - t}ms`, String(e));
    }
  } else {
    // Address line 2 is optional so skip if not provided
    reporter.push('Fill Address Line 2', 'PASS', '0ms', 'Skipped - Optional field');
  }

  // Select state from native select dropdown
  try {
    t = Date.now();
    await page.selectOption('select[formcontrolname="stateId"]', { label: LOCATION_DETAILS.locationState.trim() });
    reporter.push('Select Location State', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.locationState);
  } catch (e) {
    reporter.push('Select Location State', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill city name in text input
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="cityName"]', LOCATION_DETAILS.locationCity);
    reporter.push('Fill Location City', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.locationCity);
  } catch (e) {
    reporter.push('Fill Location City', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill pin code in text input
  try {
    t = Date.now();
    await page.fill('input[formcontrolname="zipCode"]', LOCATION_DETAILS.locationPinCode);
    reporter.push('Fill Location Pin Code', 'PASS', `${Date.now() - t}ms`, LOCATION_DETAILS.locationPinCode);
  } catch (e) {
    reporter.push('Fill Location Pin Code', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Open factory or warehouse image upload modal and upload images section by section
  try {
    t = Date.now();
    await page.click('a[data-bs-target="#factoryModal"]');
    await page.waitForTimeout(1500);

    // Factory has 5 image sections and warehouse has 3 image sections
    const uploadSections = LOCATION_DETAILS.locationType === 'factory'
      ? [
          { name: 'Building Outerview',  images: LOCATION_DETAILS.factoryImages.buildingOverview  },
          { name: 'Shop Floor',          images: LOCATION_DETAILS.factoryImages.shopFloor          },
          { name: 'Raw Material Area',   images: LOCATION_DETAILS.factoryImages.rawMaterialArea    },
          { name: 'Finished Goods Area', images: LOCATION_DETAILS.factoryImages.finishedGoodsArea  },
          { name: 'Docking Area',        images: LOCATION_DETAILS.factoryImages.dockingArea        },
        ]
      : [
          { name: 'Building Outerview',  images: LOCATION_DETAILS.warehouseImages.buildingOverview  },
          { name: 'Finished Goods Area', images: LOCATION_DETAILS.warehouseImages.finishedGoodsArea },
          { name: 'Docking Area',        images: LOCATION_DETAILS.warehouseImages.dockingArea       },
        ];

    for (let i = 0; i < uploadSections.length; i++) {
      const section = uploadSections[i];

      // Click next in modal to move to next section except for first section
      if (i > 0) {
        await page.click('button[type="submit"][data-action="next"]');
        await page.waitForTimeout(1000);
      }

      // Limit images to maximum 3 per section as per portal restriction
      const rawImages = section.images.slice(0, 3);
      const imagesToUpload: string[] = rawImages.map((img: any) => String(img));

      // Skip this section if no images are provided
      if (imagesToUpload.length === 0) {
        console.log('No images provided for ' + section.name + ' - skipping');
        reporter.push('Upload Images - ' + section.name, 'PASS', '0ms', 'No images provided - skipped');
        continue;
      }

      // Upload all images for this section at once using file input
      const fileInput = page.locator('.modal-body input[type="file"]').first();
      await fileInput.setInputFiles(imagesToUpload);
      await page.waitForTimeout(1500);
      console.log(section.name + ' - ' + imagesToUpload.length + ' image(s) uploaded');
      reporter.push('Upload Images - ' + section.name, 'PASS', `${Date.now() - t}ms`, imagesToUpload.length + ' image(s) uploaded');
    }

    // Click next on the review and upload section to complete image upload
    await page.click('button[type="submit"][data-action="next"]');
    await page.waitForTimeout(1500);
    reporter.push('Complete Image Upload - Review and Upload', 'PASS', `${Date.now() - t}ms`);

  } catch (e) {
    reporter.push('Upload Images', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Fill machine details only if location type is factory and include is set to true
  if (LOCATION_DETAILS.locationType === 'factory' && MACHINE_DETAILS.include) {
    try {
      t = Date.now();

      // Fill machine type name
      await page.fill('input[formcontrolname="machineName"]', MACHINE_DETAILS.machineName);

      // Select number of machines from dropdown
      await page.selectOption('select[formcontrolname="count"]', { value: MACHINE_DETAILS.noOfMachines });

      // Click upload button to open machine image upload modal
      await page.click('a.border.border-success:has-text("Upload")');
      await page.waitForTimeout(1000);

      // Upload machine image using hidden file input
      const machineFileInput = page.locator('input[type="file"][accept=".png, .jpg, .jpeg"]').first();
      await machineFileInput.setInputFiles(MACHINE_DETAILS.machineImagePath);
      await page.waitForTimeout(1000);

      // Click upload button inside modal to confirm upload
      await page.click('button.btn.btn-success:has-text("Upload")');
      await page.waitForTimeout(1000);
      reporter.push('Fill Machine Details', 'PASS', `${Date.now() - t}ms`, MACHINE_DETAILS.machineName);
    } catch (e) {
      reporter.push('Fill Machine Details', 'FAIL', `${Date.now() - t}ms`, String(e));
    }
  } else if (LOCATION_DETAILS.locationType === 'warehouse') {
    // Machine section is not applicable for warehouse location type
    reporter.push('Machine Details', 'PASS', '0ms', 'Skipped - Not applicable for Warehouse');
  } else {
    // Machine section is optional and include is set to false so skip it
    reporter.push('Machine Details', 'PASS', '0ms', 'Skipped - Optional field');
  }

  // Fill certificate details only if include is set to true as it is optional
  if (CERTIFICATE_DETAILS.include) {
    try {
      t = Date.now();

      // Fill certificate name
      await page.fill('input[formcontrolname="certificationName"]', CERTIFICATE_DETAILS.certificateName);

      // Fill valid from date
      await page.fill('input[formcontrolname="startDate"]', CERTIFICATE_DETAILS.validFrom);

      // Fill valid upto date
      await page.fill('input[formcontrolname="endDate"]', CERTIFICATE_DETAILS.validUpto);

      // Click upload button to open certificate upload modal
      await page.click('a.border.border-success:has-text("Upload")');
      await page.waitForTimeout(1000);

      // Upload certificate file using hidden file input
      const certFileInput = page.locator('input[type="file"][accept=".png, .jpg, .jpeg, .pdf"]').first();
      await certFileInput.setInputFiles(CERTIFICATE_DETAILS.certificatePath);
      await page.waitForTimeout(1000);

      // Click upload button inside modal to confirm upload
      await page.click('button.btn.btn-success:has-text("Upload")');
      await page.waitForTimeout(1000);
      reporter.push('Fill Certificate Details', 'PASS', `${Date.now() - t}ms`, CERTIFICATE_DETAILS.certificateName);
    } catch (e) {
      reporter.push('Fill Certificate Details', 'FAIL', `${Date.now() - t}ms`, String(e));
    }
  } else {
    // Certificate section is optional and include is set to false so skip it
    reporter.push('Certificate Details', 'PASS', '0ms', 'Skipped - Optional field');
  }

  // Click next button to move to summary page
  try {
    t = Date.now();
    await page.click('a.btn.btn-success:has-text("Next")');
    await page.waitForTimeout(2000);
    reporter.push('Click Next - Location Page', 'PASS', `${Date.now() - t}ms`);
  } catch (e) {
    reporter.push('Click Next - Location Page', 'FAIL', `${Date.now() - t}ms`, String(e));
  }

  // Location page execution completed
  console.log('LOCATION PAGE - Completed');
}