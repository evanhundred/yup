# == Schema Information
#
# Table name: owned_businesses
#
#  owned_business_id :bigint           not null
#  owner_id          :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  id                :bigint           not null, primary key
#
class OwnedBusiness < ApplicationRecord
    validates :owned_business_id, uniqueness: { scope: :owner_id, message: "only one own per user + business combination" }

    belongs_to :owner,
        class_name: :User,
        foreign_key: :owner_id,
        inverse_of: :owned_businesses

    belongs_to :owned_business,
        class_name: :Business,
        foreign_key: :owned_business_id,
        inverse_of: :owns
end
