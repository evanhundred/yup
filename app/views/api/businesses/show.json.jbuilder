json.extract! @business, :id, :name, :latitude, :longitude, :address, :city, :state, :zipcode, :neighborhood, :phone, :website, :open_at, :closed_at, :about, :category, :price, :place_id, :country, :country_code, :stub
json.image_urls @business.photos.map {|imagefile| url_for(imagefile)}
json.author_names @business.reviews.map {|review| review.author_name }
json.reviews @business.reviews.map {|review| review}

json.partial! "api/businesses/owned_businesses", business: @business
# json.partial! "api/businesses/owned_businesses", locals: {business: @business}
