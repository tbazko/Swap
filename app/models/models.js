var DB = require('../../config/database').DB;

var Product = DB.Model.extend({
  tableName: 'Products',
  idAttribute: 'productId',
  user: function() {
  	return this.belongsTo(User, 'userId');
  },
  images: function() {
    return this.hasMany(ProductImage, 'productId');
  },
  tags: function() {
    return this.belongsToMany(Tag, 'Products_Tags', 'productId', 'tagId');
  },
  swapForTags: function() {
    return this.belongsToMany(Tag, 'Products_SwapForTags', 'productId', 'tagId');
  }
});

var User = DB.Model.extend({
   tableName: 'Users',
   idAttribute: 'userId',
   products: function() {
    return this.hasMany(Product, 'userId');
   }
});

var ProductImage = DB.Model.extend({
  tableName: 'ProductImages',
  idAttribute: 'imageId',
  product: function() {
  	return this.belongsTo(Product, 'productId');
  }
});

var Tag = DB.Model.extend({
  tableName: 'Tags',
  idAttribute: 'tagId',
  products: function() {
    return this.belongsToMany(Product, 'Products_Tags', 'tagId', 'productId');
  }
});

var SwapForTag = DB.Model.extend({
  tableName: 'Tags',
  idAttribute: 'tagId',
  products: function() {
    return this.belongsToMany(Product, 'Products_SwapForTags', 'tagId', 'productId');
  }
});

var Products = DB.Collection.extend({
  model: Product
});

var ProductImages = DB.Collection.extend({
  model: ProductImage
});

var Users = DB.Collection.extend({
  model: User
});

var Tags = DB.Collection.extend({
  model: Tag
});

var SwapForTags = DB.Collection.extend({
  model: SwapForTag
});

module.exports.productModel = Product;
module.exports.productCollection = Products;

module.exports.productImageModel = ProductImage;
module.exports.productImageCollection = ProductImages;

module.exports.userModel = User;
module.exports.userCollection = Users;

module.exports.tagModel = Tag;
module.exports.tagCollection = Tags;

module.exports.swapForTagModel = Tag;
module.exports.swapForTagCollection = Tags;
