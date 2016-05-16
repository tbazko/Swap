var express       = require('express');
var router        = express.Router();
var account       = require('../requestHandlers/account');
var userItems     = require('../requestHandlers/userItems');

router.get('/profile', account.profile);
router.get('/signin', account.signIn);
router.post('/signin', account.signInPost);
router.get('/signup', account.signUp);
router.post('/signup', account.signUpPost);
router.get('/signout', account.signOut);
router.get('/add-product', account.signInRedirect, function(req, res, next) {
  res.render('addProduct', {url: req.path, userId: req.user.get('id')});
});

router.get('/my-items', userItems.render);
router.post('/destroy-item', userItems.destroyItem);
router.post('/is-authenticated', account.isAuthenticated, userItems.getItemsForSwap);

module.exports = router;
