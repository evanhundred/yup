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

    def share
        @recepient = params[:recepient]
    end

    def search
        query = params[:query]
        @businesses = Business.where("name ILIKE ? OR category ILIKE ? OR price ILIKE ?", "%#{query}%", "%#{query}%", "%#{query}%")
        if (@businesses.length > 0)
            render :index
        else
            render json: ["No results found for #{query}"], status: 404
        end
    end

    private

    # def share_biz_params
    #     params.require()
    # end

end
