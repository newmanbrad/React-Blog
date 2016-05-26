var funcs,
    crypto = require('crypto');

funcs = {
  encrypt: function (pwd) {
    return crypto.createHash('md5').update(pwd).digest('hex');
  },
  date: require('mo2js').date,
  handleErr: function (res, err) {
    res.status(500);
    res.json({
      error: err
    })
  }
};

module.exports = funcs;
