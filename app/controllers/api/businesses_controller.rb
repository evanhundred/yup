class Api::BusinessesController < ApplicationController
    def index
        @businesses = Business.all
        if @businesses
            render :index
        else
            render json: @businesses.errors.full_messages, status: 404
        end
    end

    def show
        @business = Business.find(params[:id])
        if @business
            # render "views/api/businesses/show.json.jbuilder"
            render :show
        else
            render json: @business.errors.full_messages, status: 404
        end
    end
end
