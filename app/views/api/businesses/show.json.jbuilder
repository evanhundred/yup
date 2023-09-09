json.extract! @business, :id, :name, :latitude, :longitude, :address, :city, :state, :zipcode, :neighborhood, :phone, :website, :open_at, :closed_at, :about, :category, :price, :place_id
json.image_urls @business.photos.map {|imagefile| url_for(imagefile)}
json.reviews @business.reviews.map {|review| review}
# json.extract! (
#     @business,
#     :id,
#     :name,
#     :latitude,
#     :longitude,
#     :address,
#     :city,
#     :state,
#     :zipcode,
#     :phone,
#     :website,
#     :open_at,
#     :closed_at,
#     :about,
#     :category,
#     :price
# )
