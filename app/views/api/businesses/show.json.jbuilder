json.extract! @business, :id, :name, :latitude, :longitude, :address, :city, :state, :zipcode, :neighborhood, :phone, :website, :open_at, :closed_at, :about, :category, :price, :place_id, :country, :country_code
json.image_urls @business.photos.map {|imagefile| url_for(imagefile)}
json.author_names @business.reviews.map {|review| review.author_name }
json.reviews @business.reviews.map {|review| review}

# json.reviews @business.reviews.map do |review|
#     author_name = review.author_name
#     review
# end

# @business.reviews.each {|review| review.author_name = review.author_name}
