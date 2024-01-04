var hmacValidator = require('hmac-validator');

exports.verify = function(query) {
var validate = hmacValidator({
  replacements: {
    both: {
      '&': '%26',
      '%': '%25'
    },
    keys: {
      '=': '%3D'
    }
  },
  excludedKeys: ['signature','hmac'],
  algorithm: 'sha256',
  format: 'hex',
  digestKey:'hmac'
});

return validate("client_secret", null, query);	
};


