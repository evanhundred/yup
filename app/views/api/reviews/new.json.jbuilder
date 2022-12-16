json.set! business.id do
    json.extract! business, :id, :name, :latitude, :longitude, :address, :city, :state, :zipcode, :phone, :website, :open_at, :closed_at, :about, :category, :price
    json.image_urls business.photos.map {|imagefile| url_for(imagefile)}
    json.reviews business.reviews.map {|review| review}
end
