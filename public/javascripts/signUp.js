//Load common code that includes config, then load the app logic for this page.
requirejs(['./common'], function (common) {
  requirejs(['modules/base']);
  requirejs(['modules/signUp']);
});
