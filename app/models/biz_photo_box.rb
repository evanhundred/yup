# frozen_string_literal: true

# == Schema Information
#
# Table name: biz_photo_boxes
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  business_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class BizPhotoBox < ApplicationRecord
  validates :name, presence: true

  belongs_to :business,
             class_name: :Business,
             inverse_of: :biz_photo_box

  has_many_attached :photos
end
