# frozen_string_literal: true

json.array! @biz_photo_boxes do |box|
  json.extract! box, :id, :name
  json.photoUrl url_for(box.photos.first)
end
