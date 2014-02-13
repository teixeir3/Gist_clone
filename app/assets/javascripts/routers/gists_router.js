Gisticle.Routers.Gists = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection;
    this.element = options.element;
  },

  routes: {
    "": "index",
    "gists/new": "form"
  },

  index: function () {
    var view = new Gisticle.Views.GistsIndex({
      collection: this.collection
    });
    this._swapView(view);
  },

  form: function() {
    console.log("in router form action");
    var view = new Gisticle.Views.GistForm({
      collection: this.collection
    });
    this._swapView(view);
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.leave();
    this._currentView = newView;
    this.element.html(newView.render().$el);
  }

});
