class Api::SavedBusinessesController < ApplicationController
    wrap_parameters include: SavedBusiness.attribute_names + ['saver_id', 'business_id']
    before_action :require_logged_in

    def show
    end

    def create
        @saved_business = SavedBusiness.new
        # @saved_business = SavedBusiness.new(saved_business_params)
        @saved_business.saver_id = current_user.id
        @saved_business.business_id = params[:business_id]
        if @saved_business.save
            render json: { message: "success" }, status: 200
        else
            render json: { errors: @saved_business.errors.full_messages }, status: 422
        end
    end

    private

    # def saved_business_params
    #     params.require(:saved_business).permit(:business_id)
    # end
end
