json.user do
    json.extract! @user, :id, :email, :name, :created_at, :updated_at
    json.reviews do
        @user.reviews.each do |review|
            json.set! review.id do
                json.extract! review, :id, :author_id, :business_id, :body, :rating, :created_at, :updated_at
            end
        end
    end
    json.saved_businesses do
        @user.saved_businesses.each do |saved_business|
            json.set! saved_business.id do
                json.extract! saved_business, :id, :saver_id, :saved_business_id
            end
        end
    end
    # json.reviews @user.reviews.map {|review| review}
    # json.saved_businesses @user.saved_businesses.map {|saved_business| saved_business}
end
