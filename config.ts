import * as path from 'path';

export const DATA_DIR = path.join(__dirname, 'data');

export const LOGIN = {
  email:    'vipin.yadav+07845@pactap.com',
  password: 'Stag@123',
};

export const BASIC_DETAILS = {
  companyLogoPath:      path.join(DATA_DIR, 'Logo.jpg'),
  yearsOfEstablishment: '2015',
  state:                'Maharashtra',
  city:                 'Mumbai',
  pinCode:              '400001',
  corporationIdNumber:  '987458745',
  annualTurnoverLocal:  '05CR to 10Cr',
  annualTurnoverUSD:    '5 Million to 10 Million',
  taxId:                '78AA547845ZB',
};

export const EXPORT_DETAILS = {
  doesExport:      'Yes',                           // 'Yes' or 'No'
  iecCode:         '123456789014',
  exportCountries: ['United States'],
  fobPort:         'Port of Mundra - india',
};

export const PRODUCTS = [
  {
    name:              'Bagasse Meal tray',     // e.g. Paper Mailers
    monthlyProduction: '56000',     // e.g. 45000
    moq:               '45000',              // e.g. 15000
    importDuty:        '10',             // e.g. 10
  },
];

export const LOCATION_DETAILS = {
  locationType:    'factory',                       // 'factory' or 'warehouse'
  factoryArea:     '50004',
  manpower:        '1 - 200',
  stuffingPermit:  'Yes',                           // 'Yes' or 'No'
  palletization:   'Yes',                           // 'Yes' or 'No'
  palletSize:      '40*48*45',
  perPalletCost:   '1500',
  addressLine1:    'ABCD-987454',
  addressLine2:    '',
  locationState:   'Delhi',
  locationCity:    'Delhi',
  locationPinCode: '110065',
  factoryImages: {
    buildingOverview:  [path.join(DATA_DIR, 'premises.jpg'), path],
    shopFloor:         [path.join(DATA_DIR, 'machine.jpg')],
    rawMaterialArea:   [path.join(DATA_DIR, 'rawmaterial.jpg')],
    finishedGoodsArea: [path.join(DATA_DIR, 'finishedgoods.jpg')],
    dockingArea:       [path.join(DATA_DIR, 'docking.jpg')],
  },
  warehouseImages: {
    buildingOverview:  [path.join(DATA_DIR, 'premises.jpg')],
    finishedGoodsArea: [path.join(DATA_DIR, 'finishedgoods.jpg')],
    dockingArea:       [path.join(DATA_DIR, 'docking.jpg')],
  },
};

export const MACHINE_DETAILS = {
  include:          true,                           // true or false
  machineName:      'YOUR_MACHINE_TYPE',
  noOfMachines:     '5–10',
  machineImagePath: path.join(DATA_DIR, 'machine.jpg'),
};

export const CERTIFICATE_DETAILS = {
  include:          true,                           // true or false
  certificateName:  'YOUR_CERT_NAME',
  validFrom:        '2023-01-01',
  validUpto:        '2026-01-01',
  certificatePath:  path.join(DATA_DIR, 'certificate.pdf'),
};

export const EMAIL_REPORT = {
  from: 'vipin.yadav@pactap.com',
  pass: 'znoxqhtwcklxiqme',
  to:   'vipin.decent@gmail.com',
};