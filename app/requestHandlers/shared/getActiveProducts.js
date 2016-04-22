var getActiveProducts = function(q) {
  q.whereIn('state', ['FOR_SALE', 'PENDING'])
}

module.exports = getActiveProducts;
