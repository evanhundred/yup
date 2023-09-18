# json.user do
    json.extract! @user, :id, :email, :name, :created_at, :updated_at
    # json.saved_businesses @user.saved_businesses, partial 'users/saved_business', saved_business: @user.saved_business
    json.partial! "api/users/saved_businesses", locals: {user: @user}
