Gisticle.Routers.Gists = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection;
    this.element = options.element;
  },

  routes: {
    "": "index"
  },

  index: function () {
    console.log("hello from router.index: ")
    var view = new Gisticle.Views.GistsIndex({
      collection: this.collection
    });
    this._swapView(view);
  },

  _swapView: function (newView) {
    console.log("In swapView: ");
    this._currentView && this._currentView.empty();
    this._currentView = newView;
    console.log(newView);
    this.element.html(newView.render().$el);
  }

});
