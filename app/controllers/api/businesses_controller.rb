class Api::BusinessesController < ApplicationController
    wrap_parameters include: Business.attribute_names + ['openAt', 'closedAt']
    def index
        @businesses = Business.all
        @users = User.all
        @current_user = current_user
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

    def search

    end
end
