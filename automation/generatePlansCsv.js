import fs from 'fs';

const productsData = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const headers = [
  'Product ID',
  'Product Name',
  'Website',
  'Headquarters',
  'Supported Platforms',
  'Free Trial',
  'Self Signup',
  'Pricing Available',
  'Has Freemium',
  'Pricing Tier',
  'Plan Name',
  'Monthly Price',
  'Yearly Price'
];

function escapeCsvValue(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function arrayToString(arr) {
  if (!Array.isArray(arr)) return '';
  return arr.join('; ');
}

const csvRows = [];

csvRows.push(headers.join(','));

productsData.forEach(product => {
  if (product.discontinued) {
    return;
  }

  const baseRow = [
    escapeCsvValue(product.id),
    escapeCsvValue(product.name),
    escapeCsvValue(product.website),
    escapeCsvValue(product.headquarters),
    escapeCsvValue(arrayToString(product.supported_platforms)),
    escapeCsvValue(product.pricing?.free_trial || false),
    escapeCsvValue(product.self_signup || false),
    escapeCsvValue(product.pricing?.pricing_available || false),
    escapeCsvValue(product.pricing?.has_freemium || false),
    escapeCsvValue(product.pricing?.tier || ''),
    '', // Plan Name (will be filled by plans)
    '', // Monthly Price (will be filled by plans)
    ''  // Yearly Price (will be filled by plans)
  ];

  if (product.pricing?.plans && product.pricing.plans.length > 0) {
    product.pricing.plans.forEach(plan => {
      const planRow = [...baseRow];
      planRow[10] = escapeCsvValue(plan.name); // Plan Name
      planRow[11] = escapeCsvValue(plan.monthly); // Monthly Price
      planRow[12] = escapeCsvValue(plan.yearly); // Yearly Price
      csvRows.push(planRow.join(','));
    });
  } else {
    // If no plans but pricing is available, create a single row with empty plan fields
    if (product.pricing?.pricing_available) {
      csvRows.push(baseRow.join(','));
    }
  }
});

const csvContent = csvRows.join('\n');
fs.writeFileSync('data/plans.csv', csvContent);

console.log(`✅ Generated plans CSV with ${csvRows.length - 1} rows`);
console.log('📁 File saved to: data/plans.csv'); 