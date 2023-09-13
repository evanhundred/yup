# json.saved_businesses @user.saved_businesses.map {|saved_business| saved_business}
json.saved_businesses @user.saved_businesses, :id, :saver_id, :saved_business_id, :created_at, :updated_at
