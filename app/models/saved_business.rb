# frozen_string_literal: true

# == Schema Information
#
# Table name: saved_businesses
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  saved_business_id :bigint           not null
#  saver_id          :bigint           not null
#
# Indexes
#
#  index_saved_businesses_on_saved_business_id               (saved_business_id)
#  index_saved_businesses_on_saver_id                        (saver_id)
#  index_saved_businesses_on_saver_id_and_saved_business_id  (saver_id,saved_business_id)
#
# Foreign Keys
#
#  fk_rails_...  (saved_business_id => businesses.id)
#  fk_rails_...  (saver_id => users.id)
#
class SavedBusiness < ApplicationRecord
  validates :saved_business_id,
            uniqueness: { scope: :saver_id, message: 'only one save per user + business combination' }

  belongs_to :saver,
             class_name: :User,
             foreign_key: :saver_id,
             inverse_of: :saved_businesses

  belongs_to :saved_business,
             class_name: :Business,
             foreign_key: :saved_business_id,
             inverse_of: :saves
end
