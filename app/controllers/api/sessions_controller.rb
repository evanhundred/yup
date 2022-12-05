class Api::SessionsController < ApplicationController
  def show
    if current_user
      # render json: { user: current_user }
      @user = current_user
      render '/api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email],params[:password])
    if @user
      login!(@user)
      render '/api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.']}, status: :unauthorized
    end
  end

  def destroy
    if current_user
      logout!
    end
    render json: { message: 'success'}
  end
end
