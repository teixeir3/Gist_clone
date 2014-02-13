window.Gisticle = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var element = $("#content")

    new Gisticle.Collections.Gists().fetch({
      success: function(collection) {
        new Gisticle.Routers.Gists({
          collection: collection,
          element: element
        })
        Backbone.history.start();
      },
      error: function(collection, response) {
        console.log("BIG PROBLEM: " + response)
      }
    });
  }
};

$(document).ready(function(){
  Gisticle.initialize();
});
