Gisticle.Views.GistsIndex = Backbone.View.extend({
  initialize: function (attributes) {
    this.subViews = [];
  },

  tagName: "ul",
  className: "gist-index-list",
  template: JST['gists/index'],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    var that = this;
    this.collection.each(function (model) {
      var view = new Gisticle.Views.GistListItem({
        model: model
      });
      that.subViews.push(view);
      that.$el.append(view.render().$el);
    });

    return this;
  },

  leave: function () {
    this.subViews.forEach(function (subView) {
      subView.leave();
    });
    this.remove();
  }

});
