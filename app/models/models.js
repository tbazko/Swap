var DB = require('../../config/database').DB;

var User = DB.Model.extend({
  tableName: 'users',
  idAttribute: 'id',
  products: function() {
    return this.hasMany(Product);
  },
  newSwapRequests: function() {
    return this.hasMany(SwapRequest, 'seller_id');
  },
  swapRequestsIncoming: function() {
    return this.hasMany(SwapRequest, 'seller_id');
  },
  swapRequestsOutgoing: function() {
    return this.hasMany(SwapRequest, 'buyer_id');
  }
});

var Product = DB.Model.extend({
  tableName: 'products',
  idAttribute: 'id',
  user: function() {
  	return this.belongsTo(User);
  },
  images: function() {
    return this.hasMany(ProductImage);
  },
  tags: function() {
    return this.belongsToMany(Tag);
  },
  swapForTags: function() {
    return this.belongsToMany(Tag, 'products_swapForTags');
  },
  // where Product is as Master (main one)
  swapRequestsAsMaster: function() {
    return this.belongsToMany(SwapRequest, 'masterProducts_swapRequests', 'product_id', 'request_id');
  },
  // where Product is as Slave, proposed for barter
  swapRequestsAsSlave: function() {
    return this.belongsToMany(SwapRequest, 'slaveProducts_swapRequests', 'product_id', 'request_id');
  }
});

var SwapRequest = DB.Model.extend({
  tableName: 'swapRequests',
  idAttribute: 'id',
  seller: function() {
    return this.belongsTo(User, 'seller_id');
  },
  buyer: function() {
    return this.belongsTo(User, 'buyer_id');
  },
  masterProducts: function() {
    return this.belongsToMany(Product, 'masterProducts_swapRequests', 'request_id', 'product_id');
  },
  slaveProducts: function() {
    return this.belongsToMany(Product, 'slaveProducts_swapRequests', 'request_id', 'product_id');
  }
});

var ProductImage = DB.Model.extend({
  tableName: 'productImages',
  idAttribute: 'id',
  product: function() {
  	return this.belongsTo(Product);
  }
});

var Tag = DB.Model.extend({
  tableName: 'tags',
  idAttribute: 'id',
  products: function() {
    return this.belongsToMany(Product);
  }
});

var SwapForTag = DB.Model.extend({
  tableName: 'tags',
  idAttribute: 'id',
  products: function() {
    return this.belongsToMany(Product, 'products_swapForTags', 'id', 'tag_id');
  }
});

var Users = DB.Collection.extend({
  model: User
});

var Products = DB.Collection.extend({
  model: Product
});

var SwapRequests = DB.Collection.extend({
  model: SwapRequest
});

var ProductImages = DB.Collection.extend({
  model: ProductImage
});

var Tags = DB.Collection.extend({
  model: Tag
});

var SwapForTags = DB.Collection.extend({
  model: SwapForTag
});

module.exports.userModel = User;
module.exports.userCollection = Users;

module.exports.productModel = Product;
module.exports.productCollection = Products;

module.exports.swapRequestModel = SwapRequest;
module.exports.swapRequestCollection = SwapRequests;

module.exports.productImageModel = ProductImage;
module.exports.productImageCollection = ProductImages;

module.exports.tagModel = Tag;
module.exports.tagCollection = Tags;

module.exports.swapForTagModel = Tag;
module.exports.swapForTagCollection = Tags;
