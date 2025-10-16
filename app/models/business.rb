# frozen_string_literal: true

# == Schema Information
#
# Table name: businesses
#
#  id              :bigint           not null, primary key
#  about           :text
#  address         :string           not null
#  aws_dir         :string
#  category        :string
#  city            :string           not null
#  closed_at       :string
#  country         :string
#  country_code    :integer
#  latitude        :decimal(, )
#  longitude       :decimal(, )
#  name            :string           not null
#  neighborhood    :string
#  open_at         :string
#  phone           :string           not null
#  photos_metadata :jsonb
#  price           :string
#  state           :string           not null
#  stub            :string
#  website         :string
#  zipcode         :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  place_id        :string
#
# Indexes
#
#  index_businesses_on_address  (address)
#  index_businesses_on_city     (city)
#  index_businesses_on_name     (name)
#  index_businesses_on_zipcode  (zipcode)
#
class Business < ApplicationRecord
  # stub:
  validates :name, :address, :city, :state, :phone, :neighborhood, :country_code, :country, :stub,
            presence: true
  validates :name, uniqueness: { case_sensitive: false }

  has_many :reviews,
           class_name: :Review,
           foreign_key: :business_id,
           inverse_of: :business,
           dependent: :destroy

  has_many :saves,
           inverse_of: :saved_business,
           foreign_key: :saved_business_id,
           class_name: :SavedBusiness,
           dependent: :destroy

  has_many :owns,
           inverse_of: :owned_business,
           foreign_key: :owned_business_id,
           class_name: :OwnedBusiness,
           dependent: :destroy

  has_many_attached :photos

  def user_is_owner(user)
    owns.any? do |own|
      user.id == own.owner_id
    end
  end
end
