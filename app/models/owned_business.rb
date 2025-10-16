# frozen_string_literal: true

# == Schema Information
#
# Table name: owned_businesses
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  owned_business_id :bigint           not null
#  owner_id          :bigint           not null
#
# Indexes
#
#  index_owned_businesses_on_owned_business_id               (owned_business_id)
#  index_owned_businesses_on_owned_business_id_and_owner_id  (owned_business_id,owner_id)
#  index_owned_businesses_on_owner_id                        (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (owned_business_id => businesses.id)
#  fk_rails_...  (owner_id => users.id)
#
class OwnedBusiness < ApplicationRecord
  validates :owned_business_id,
            uniqueness: { scope: :owner_id, message: 'only one own per user + business combination' }

  belongs_to :owner,
             class_name: :User,
             foreign_key: :owner_id,
             inverse_of: :owned_businesses

  belongs_to :owned_business,
             class_name: :Business,
             foreign_key: :owned_business_id,
             inverse_of: :owns
end
