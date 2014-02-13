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
      gist.favorites do |favorite|

        if self.favorites.empty?
          favorite.nil!
        else

          self.favorites do |current_favorite|
            next unless current_favorite.gist_id == self.id
            current_favorite.to_builder
          end

        end

      end

    end

  end
end
