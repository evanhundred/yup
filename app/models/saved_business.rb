# == Schema Information
#
# Table name: saved_businesses
#
#  business_id :bigint           not null
#  saver_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class SavedBusiness < ApplicationRecord
    belongs_to :saver,
        class_name: :User,
        foreign_key: :saver_id,
        inverse_of: :saved_businesses

    belongs_to :business,
        foreign_key: :business_id,
        inverse_of: :saves
end
