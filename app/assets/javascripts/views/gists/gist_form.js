Gisticle.Views.GistForm = Backbone.View.extend({

  tagName: "form",
  className: "gist-form",
  template: JST["gists/form"],

  events: {
    "submit": "saveGist",
    "click .favorite-button": "toggleFavorite"
  },

  render: function () {
    console.log("in Form render");
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  leave: function () {
    this.remove();
  },

  saveGist: function(event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    var newGist = new Gisticle.Models.Gist(formData);

    // console.log(newGist);

    var that = this;

    this.collection.create(formData, {
      success: function(model, response) {
        that.model = model;
      },
      error: function() {
      }
    })
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