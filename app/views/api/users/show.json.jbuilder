json.user do
    json.extract! @user, :id, :email, :name, :created_at, :updated_at
    json.reviews @user.reviews.map {|review| review}
    json.saved_businesses @user.saved_businesses.map {|saved_business| saved_business}
end
