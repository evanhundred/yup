class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render json: @user
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: 422 # :unprocessable_entity
    end
  end

  def edit

  end

  def patch

  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password)
  end
end
