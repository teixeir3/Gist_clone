class Favorite < ActiveRecord::Base
  attr_accessible :user_id, :gist_id

  validates :user_id, :gist_id, presence: true
  validates :user_id, uniqueness: { scope: :gist_id }

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :gist,
    class_name: "Gist",
    foreign_key: :gist_id,
    primary_key: :id
  )


  def to_builder
    Jbuilder.new do |favorite|
      favorite.id self.id
      favorite.user_id self.user_id
      favorite.gist_id self.gist_id
    end
  end
end
