# == Schema Information
#
# Table name: businesses
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  address    :string           not null
#  zipcode    :string           not null
#  city       :string           not null
#  state      :string           not null
#  latitude   :decimal(, )
#  longitude  :decimal(, )
#  phone      :string           not null
#  website    :string
#  open_at    :string           not null
#  closed_at  :string           not null
#  about      :text             not null
#  category   :string           not null
#  price      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Business < ApplicationRecord
    validates :name, :address, :zipcode, :city, :state, :phone, :open_at, :closed_at, :about, :category, :price, presence: true

    has_many :reviews,
        foreign_key: :businesses_id

    # has_many_attached :photos
end
