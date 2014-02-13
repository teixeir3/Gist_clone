Gisticle.Views.GistListItem = Backbone.View.extend({

  tagName: "li",
  className: "gist-list-item",
  template: JST["gists/list_item"],

  render: function () {
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    return this;
  },

  leave: function () {
    this.remove();
  }

});