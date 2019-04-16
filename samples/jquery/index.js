$(function() {
  var router = {
    index: function() {
      $(".container").load("./modeloPage.html");
    },
    yourPage: function() {
      $(".container").load("./yourPage.html");
    }
  };

  var routes = {
    "/index": router.index,
    "/yourPage": router.yourPage
  };
  var router = Router(routes);
  router.init("/index"); //初始化页面
});
