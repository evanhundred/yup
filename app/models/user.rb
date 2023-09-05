# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  name            :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token

  validates :name, presence: true, length: {in: 3..30}, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email, :session_token, presence: true, uniqueness: true
  validates :email, length: {in: 3..255}, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 6..255 }, allow_nil: true

  has_many :reviews,
    foreign_key: :author_id,
    inverse_of: :author,
    dependent: :destroy

  has_many :saved_businesses,
    class_name: :SavedBusiness,
    foreign_key: :saver_id,
    inverse_of: :saver,
    dependent: :destroy

  def save_business(business_id)
    @user = current_user
    @business = Business.find(business_id)

    if @business && @user
      @user.saved_businesses.push(@business)
      render json: { message: 'success'}
    else
      render json: { errors: @user.errors.full_messages}, status: 422
    end
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user&.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save
    self.session_token
  end

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
