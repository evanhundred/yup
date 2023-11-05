class Api::OwnedBusinessesController < ApplicationController
    wrap_parameters include: OwnedBusiness.attribute_names + ['owner_id', 'owned_business_id']
    before_action :require_logged_in

    def create
        @owned_business = OwnedBusiness.new

        @owned_business.owner_id = current_user.id
        @business = Business.find(params[:business_id])
        @owned_business.owned_business_id = @business.id
        if @owned_business.save
            render json: { message: 'success', status: 200, owned_business_id: @owned_business.id }
        else
            render json: { body: { errors: @owned_business.errors.full_messages }, status: 422 }
        end
    end
end
