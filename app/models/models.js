var DB = require('../../config/database').DB;

var Product = DB.Model.extend({
  tableName: 'Products',
  idAttribute: 'productId',
  user: function() {
  	return this.belongsTo(User, 'userId');
  },
  images: function() {
    return this.hasMany(ProductImage, 'productId');
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

var Products = DB.Collection.extend({
  model: Product
});

var ProductImages = DB.Collection.extend({
  model: ProductImage
});

var Users = DB.Collection.extend({
  model: User
});

module.exports.productModel = Product;
module.exports.productCollection = Products;

module.exports.productImageModel = ProductImage;
module.exports.productImageCollection = ProductImages;

module.exports.userModel = User;
module.exports.userCollection = Users;
