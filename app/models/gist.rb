class Gist < ActiveRecord::Base
  attr_accessible :title, :owner_id

  validates :title, :owner_id, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :favorites,
    class_name: "Favorite",
    foreign_key: :gist_id,
    primary_key: :id
  )

  has_many(
    :admirers,
    through: :favorites,
    source: :user
  )

  def as_json
    self.to_builder.target!
  end

  def to_builder
    Jbuilder.new do |gist|
      gist.id self.id
      gist.title self.title
      gist.owner_id self.owner_id
      # gist.favorite true
      if self.favorites.empty?
        gist.favorite nil
      else
        gist.favorite self.favorites.map(&:to_builder).map(&:target!)

        # gist.array! self.favorites do |favorite|
        #   next unless favorite.gist_id == self.id
        #   favorite (self.favorites, :id, :owner_id, :gist_id)
        #   # favorite.id favorite.id
        #   # favorite.owner_id favorite.user_id
        #   # favorite.gist_id favorite.gist_id
        # end
      end
      #   gist.favorites do |favorite|
      #     # self.favorites do |current_favorite|
      #       # next unless current_favorite.gist_id == self.id
      #       favorite.to_builder
      #     # end
      #   end
    end
  end
end
