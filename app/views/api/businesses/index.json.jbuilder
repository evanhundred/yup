@businesses.each do |business|
    json.set! business.id do
        json.extract! business, :id, :name, :latitude, :longitude, :address, :city, :state, :zipcode, :phone, :website, :open_at, :closed_at, :about, :category, :price
        json.image_urls business.photos.map {|imagefile| url_for(imagefile)}
        json.reviews business.reviews
    end
end

@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :name
    end
end

# json.array! @businesses, :id, :name, :latitude, :longitude, :address, :city, :state, :zipcode, :phone, :website, :open_at, :closed_at, :about, :category, :price
# @businesses.each do |business|
#     json.image_urls business.photos.map {|imagefile| url_for(imagefile)}
# end
