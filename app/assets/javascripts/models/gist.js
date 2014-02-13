Gisticle.Models.Gist = Backbone.Model.extend({
  initialize: function() {
    // this.favorites();
  },

  parse: function(response) {
    var modelAttributes = jQuery.parseJSON(response);
    var favoriteAttributes = jQuery.parseJSON(modelAttributes.favorite);

    if (favoriteAttributes) {
      modelAttributes.favorite = new Gisticle.Models.Favorite(favoriteAttributes);
    };

    return modelAttributes;
  },

  toJSON: function () {
    var modifiedAttributes = _.extend({}, this.attributes);
    delete modifiedAttributes.favorite;
    return modifiedAttributes;
  }
});
