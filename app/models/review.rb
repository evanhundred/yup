# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  rating      :integer          not null
#  body        :text             not null
#  author_id   :bigint           not null
#  business_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord
    validates :rating, presence: true, numericality: { only_integer: true }, inclusion: 1..10
    validates :body, presence: true

    belongs_to :author,
        class_name: :User,
        inverse_of: :reviews
    belongs_to :business,
        class_name: :Business,
        inverse_of: :reviews
end
