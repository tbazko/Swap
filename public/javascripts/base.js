//Load common code that includes config, then load the app logic for this page.
requirejs(['./common'], function (common) {
  requirejs(['components/main']);
  requirejs(['components/tabPane']);
  requirejs(['components/filter']);
  requirejs(['components/swapItemRequest']);
  requirejs(['components/Messenger']);
});
