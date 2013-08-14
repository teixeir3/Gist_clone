class User < ActiveRecord::Base
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def verify_password(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end