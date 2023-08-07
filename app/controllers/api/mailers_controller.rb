class Api::MailersController < ApplicationController
    def share
        if @current_user
            @mail =
            @user = @current_user
            @sender.email = @user.email
            @sender.name = @user.name
            @business = Business.find(params[:business_id])


        end
    end

    private

    def mailer_params
        params.require(:mailer).permit(:user, :business)
    end
end
