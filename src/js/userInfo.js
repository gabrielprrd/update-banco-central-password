const xlsx = require('xlsx');

module.exports = () => {
  console.log('Reading table...');
  const data = xlsx.readFile('src/static/sheets/banco_central_test.xlsx')

  console.log('Converting worksheet into array of objects...');
  const sheet = data.Sheets[data.SheetNames[0]];

  return xlsx.utils.sheet_to_json(sheet, {
    header: ["username", "oldPassword", "newPassword"], // property names
    range: 1 // skip first sheet's first row (header)
  });
};