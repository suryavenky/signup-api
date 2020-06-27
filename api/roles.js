// server/roles.js
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('employee').readOwn('profile').updateOwn('profile');

  ac.grant('admin')
    .extend('employee')
    .readAny('profile')
    .updateAny('profile')
    .deleteAny('profile');

  return ac;
})();
