module.exports = function(app) {
  require('./main')(app);
  require('./shipper')(app);
  require('./auth')(app);
};
