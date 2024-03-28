# frozen_string_literal: true

module Api
  # users
  class UsersController < ApplicationController
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

    def show
      @user = User.find(params[:id])
      if @user
        render :show
      else
        render json: @user.errors.full_messages, status: 404
      end
    end

    # def save_business
    #   @user = current_user
    #   @business = Business.find(params[:business_id])

    #   redirect_to api_business_path(@business)
    # end

    # def save_business_1
    #   @user = current_user
    #   @business = Business.find(params[:business_id])

    #   if @user && @business
    #     @user.save_business(@business.id)
    #   else
    #     render json: @user.errors
    #   end
    # end

    def edit; end

    def patch; end

    private

    def user_params
      params.require(:user).permit(:email, :name, :password)
    end
  end
end
