Gisticle.Views.GistListItem = Backbone.View.extend({

  tagName: "li",
  className: "gist-list-item",
  template: JST["gists/list_item"],

  render: function () {
    console.log("model number " + this.model.id + " in render");
    console.log(this.model);
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