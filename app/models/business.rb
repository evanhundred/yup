# == Schema Information
#
# Table name: businesses
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  address      :string           not null
#  zipcode      :string           not null
#  city         :string           not null
#  state        :string           not null
#  latitude     :decimal(, )
#  longitude    :decimal(, )
#  phone        :string           not null
#  website      :string
#  open_at      :string
#  closed_at    :string
#  about        :text
#  category     :string
#  price        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  neighborhood :string
#  place_id     :string
#  country_code :integer
#  country      :string
#  stub         :string
#  owner_id     :bigint
#
class Business < ApplicationRecord
    # stub:
    validates :name, :address, :city, :state, :phone, :neighborhood, :country_code, :country, :stub, presence: true

    # full business:
    # validates :name, :address, :zipcode, :city, :state, :phone, :open_at, :closed_at, :about, :category, :price, :neighborhood, :country_code, :country, :stub, presence: true
    # attr_accessor :stub

    # def stub=(string)
    #     self.stub = string
    # end

    has_many :reviews,
        class_name: :Review,
        foreign_key: :business_id,
        inverse_of: :business,
        dependent: :destroy

    belongs_to :owner,
        class_name: :User,
        foreign_key: :owner_id,
        inverse_of: :owned_businesses

    # has_one :biz_photo_box,
    #     foreign_key: :business_id,
    #     inverse_of: :business

    has_many :saves,
        inverse_of: :saved_business,
        foreign_key: :saved_business_id,
        class_name: :SavedBusiness,
        dependent: :destroy

    has_many_attached :photos
end
