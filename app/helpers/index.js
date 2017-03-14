module.exports.isAuthenticated = require('./isAuthenticated');
module.exports.signInRedirect = require('./signInRedirect');

module.exports.arrayToObject = function (data) {
  let formattedData = {};
  data.forEach((cluster) => {
    for(var key in cluster) {
      if (!cluster.hasOwnProperty(key)) continue;
      formattedData[key] = cluster[key];
    }
  });
  return formattedData;
}