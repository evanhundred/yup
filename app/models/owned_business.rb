# == Schema Information
#
# Table name: owned_businesses
#
#  user_id           :bigint           not null
#  business_id       :bigint           not null
#  owned_business_id :bigint           not null
#  owner_id          :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class OwnedBusiness < ApplicationRecord
    belongs_to :owner,
        class_name: :User,
        foreign_key: :owner_id,
        inverse_of: :owned_businesses

    belongs_to :owned_business,
        class_name: :Business,
        foreign_key: :owned_business_id,
        inverse_of: :owns
end
