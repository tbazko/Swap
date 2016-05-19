var events = require('events');
var cloudinary = require('../../../config/cloudinary');

var getProductsList = function(collection, eventEmitter) {
  var product;
  var products = [];
  collection.forEach(function(model, key) {
    var imageId = model.related('images').first() ? model.related('images').first().get('id') : 'sample';
    var swapForTags = model.related('swapForTags').serialize();
    var tags = model.related('tags').serialize();

    product = {
      id: model.get('id'),
      name: model.get('name'),
      image: cloudinary.image(imageId + '.jpg', {width: 460, height: 440, crop: 'fill', gravity: 'face'}),
      swapForTags: swapForTags,
      tags: tags
    };
    products.push(product);
  });

  eventEmitter.emit('productsFetched', products);
}

module.exports = getProductsList;
