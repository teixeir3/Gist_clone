Gisticle.Views.GistListItem = Backbone.View.extend({

  tagName: "li",
  className: "gist-list-item",
  template: JST["gists/list_item"],

  events: {
    "click .favorite-button": "toggleFavorite"
  },

  render: function () {
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    return this;
  },

  leave: function () {
    this.remove();
  },

  toggleFavorite: function(event) {
    event.preventDefault();
    var that = this;

    if (this.model.get("favorite")) {
      this.model.get("favorite").destroy({
        success: function() {
          that.model.set("favorite", null);
          $(event.currentTarget).toggleClass("already-favorited");
        }
      })
    } else {
      var favorite = new Gisticle.Models.Favorite({ gist_id: this.model.id });
      favorite.save(null, {
        success: function() {
          that.model.set("favorite", favorite);
          $(event.currentTarget).toggleClass("already-favorited");
        },
        error: function() {
        }
      });
    };
  }

});