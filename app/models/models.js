var DB = require('../../config/database').DB;

var Product = DB.Model.extend({
  tableName: 'products',
  idAttribute: 'ProductId',
  user: function() {
  	return this.belongsTo(User, 'UserId');
  }
});

var User = DB.Model.extend({
   tableName: 'users',
   idAttribute: 'UserId',
   products: function() {
    return this.hasMany(Product, 'UserId');
   }
});

var Products = DB.Collection.extend({
  model: Product
});

var Users = DB.Collection.extend({
  model: User
});

module.exports.productModel = Product;
module.exports.productCollection = Products;

module.exports.userModel = User;
module.exports.userCollection = Users;
