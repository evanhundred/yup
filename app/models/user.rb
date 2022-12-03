class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token

  validates :name, presence: true, length: {in: 3..30}, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email, :session_token, presence: true, uniqueness: true
  validates :email, length: {in: 3..255}, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 6..255 }, allow_nil: true

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
