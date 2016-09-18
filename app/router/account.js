var express       = require('express');
var router        = express.Router();
var account       = require('../requestHandlers/account/account');
var userItems     = require('../requestHandlers/account/userItems');
var requests     = require('../requestHandlers/account/requests');

router.get('/profile', account.profile);
router.get('/signin', account.signIn);
router.post('/signin', account.signInPost);
router.get('/signup', account.signUp);
router.post('/signup', account.signUpPost);
router.get('/signout', account.signOut);
router.get('/add-item', account.signInRedirect, function(req, res, next) {
  res.render('editItemForm', {url: req.path, userId: req.user.id, newItem: 1});
});
router.get('/requests', account.signInRedirect, requests.render);
router.get('/requests/:id', account.signInRedirect, requests.renderOne);
router.post('/requests/:id/message', account.signInRedirect, requests.postMessage);

router.get('/my-items', userItems.render);
router.post('/destroy-item', userItems.destroyItem);
router.post('/edit-item', account.signInRedirect, userItems.editItem);
router.post('/is-authenticated', account.isAuthenticated, userItems.getItemsForSwap);

module.exports = router;
