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

  def to_json(something = {})
    self.to_builder.target!
  end

  def to_builder
    Jbuilder.new do |gist|
      gist.id self.id
      gist.title self.title
      gist.owner_id self.owner_id
      if self.favorites.empty?
        gist.favorite nil
      else
        gist.favorite self.favorites.map(&:to_builder).map(&:target!)
      end
    end
  end
end
