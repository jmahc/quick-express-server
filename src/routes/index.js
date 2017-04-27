module.exports = function(app) {
  require('./main')(app);
  require('./form')(app);
  require('./consignee')(app);
  require('./notify')(app);
  require('./shipper')(app);
  require('./auth')(app);
};
