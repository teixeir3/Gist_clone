class User < ActiveRecord::Base
  attr_accessible :username, :password, :gists
  attr_reader :password

  validates :password_digest, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :presence => true, :uniqueness => true
  validates :username, :presence => true, :uniqueness => true

  before_validation :ensure_session_token

  has_many(
    :gists,
    class_name: "Gist",
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :favorites,
    class_name: "Favorite",
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :favorite_gists,
    through: :favorites,
    source: :gist
  )

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try(:is_password?, password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def password=(unencrypted_password)
    if unencrypted_password.present?
      @password = unencrypted_password
      self.password_digest = BCrypt::Password.create(unencrypted_password)
    end
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
