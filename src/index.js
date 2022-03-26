const userInfo = require('./js/userInfo');
const fillForm = require('./js/fillForm');

console.log('===== Application started =====');
fillForm(userInfo(), 'https://fs.bcnet.bcb.gov.br/adfs/portal/updatepassword/');
