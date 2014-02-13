Gisticle.Models.Gist = Backbone.Model.extend({
  initialize: function() {
    // this.favorites();
  },

  url: "/gists",

  parse: function(response) {
    // var modelAttributes = jQuery.parseJSON(response);
    // var favoriteAttributes = jQuery.parseJSON(response.favorite);
    console.log(response);

    if (response.favorite) {
      response.favorite = new Gisticle.Models.Favorite(response.favorite);
    };

    return response;
  },

  toJSON: function () {
    var modifiedAttributes = _.extend({}, this.attributes);
    delete modifiedAttributes.favorite;
    return modifiedAttributes;
  }
});
