class Api::SavedBusinessesController < ApplicationController
    wrap_parameters include: SavedBusiness.attribute_names + ['saver_id', 'business_id']
    before_action :require_logged_in

    def show
    end

    def create
        @saved_business = SavedBusiness.new
        # @saved_business = SavedBusiness.new(saved_business_params)
        @saved_business.saver_id = current_user.id
        @business = Business.find(params[:business_id])
        @saved_business.saved_business_id = @business.id
        if @saved_business.save
            redirect_to api_business_path(params[:business_id])
            # render json: { message: "success" }, status: 200
        else
            render json: { body: { errors: @saved_business.errors.full_messages }, status: 422 }
        end
    end

    private

    # def saved_business_params
    #     params.require(:saved_business).permit(:business_id)
    # end
end
