# frozen_string_literal: true

module Api
  # control email
  class MailersController < ApplicationController
    def share
      return unless @current_user

      @mail =
        @user = @current_user
      @sender.email = @user.email
      @sender.name = @user.name
      @business = Business.find(params[:business_id])
    end

    private

    def mailer_params
      params.require(:mailer).permit(:user, :business)
    end
  end
end
