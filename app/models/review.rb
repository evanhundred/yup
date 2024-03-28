# frozen_string_literal: true

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
  validates :rating, presence: true, numericality: { only_integer: true },
                     inclusion: { in: (1..5), message: 'Please select a rating for this business.' }
  validates :body, presence: true

  # has_one :author_name,
  #     through: author

  belongs_to :author,
             class_name: :User,
             foreign_key: :author_id,
             inverse_of: :reviews
  belongs_to :business,
             class_name: :Business,
             foreign_key: :business_id,
             inverse_of: :reviews

  def author_name
    @user = User.find(author_id)
    {
      name: @user.name,
      review_id: id
    }
  end
end
