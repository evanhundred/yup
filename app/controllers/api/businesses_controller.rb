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

    # def new
    #     @business = Business.new
    #     render :show
    # end

    def create
        @business = Business.new(business_params)
        # @business.stub = 'true'
        if @business.save
            render :show
        else
            render json: {errors: @business.errors.full_messages}, status: 422
        end
    end

    # def share
    #     @recepient = params[:recepient]
    # end

    def update
        @business = Business.find(params[:id])
        if user_is_owner(current_user) && @business.update(business_params)
            render :show
        else
            render json: { errors: @business.errors.full_messages }, status: 422
        end
    end

    def search
        query = params[:query]
        @businesses = Business.where("name ILIKE ? OR category ILIKE ? OR price ILIKE ?", "%#{query}%", "%#{query}%", "%#{query}%")
        # render json: @businesses
        if (@businesses.length > 0)
            render :index
        else
            # render json: { message: @businesses.length }, status: 404
            render json: ["No results found for #{query}"], status: 404
        end
    end

    private

    def business_params
        params.require(:business).permit(
            :name,
            :latitude,
            :longitude,
            :address,
            :city,
            :state,
            :zipcode,
            :neighborhood,
            :phone,
            :website,
            :open_at,
            :closed_at,
            :about,
            :category,
            :price,
            :place_id,
            :country,
            :country_code,
            :stub
        )
    end

    # def share_biz_params
    #     params.require()
    # end

end
