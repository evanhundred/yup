# frozen_string_literal: true

json.extract! @biz_photo_box, :id, :name, :business_id
json.image_urls(@biz_photo_box.photos.map { |imagefile| url_for(imagefile) })
