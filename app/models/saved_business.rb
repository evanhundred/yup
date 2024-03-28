# frozen_string_literal: true

# == Schema Information
#
# Table name: saved_businesses
#
#  saved_business_id :bigint           not null
#  saver_id          :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  id                :bigint           not null, primary key
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
