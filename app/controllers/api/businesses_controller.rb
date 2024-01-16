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
        if @business.user_is_owner(current_user) && @business.update(business_params)
            render :show
        else
            render json: { errors: @business.errors.full_messages }, status: 422
        end
    end

    def destroy
        @business = Business.find(params[:id])
        unless @business && @business.destroy
            render json: { errors: @business.errors.full_messages }, status: 422
        else
            render json: { message: "success" }, status: 200
        end
    end

    def search

        # query = Regexp.new(params[:query].parameterize)
        #     business.price.match(query) ||

        # query =
        query = params[:query].parameterize

        # @businesses = Business.find_each do |business|
        #     business.name.parameterize.match(query) ||
        #         business.category.parameterize.match(query) ||
        #         business.city.parameterize.match(query) ||
        #         business.neighborhood.parameterize.match(query)
        # end
        # @businesses = Business.find_by(name: name.parameterize)
        # @businesses = Business.where(name.parameterize.match(query))
        @businesses = []
        puts @businesses
        if @businesses.length
            for biz in Business.all do
                    if biz.name.parameterize.match(query) ||
                        biz.category.parameterize.match(query) ||
                        biz.price.parameterize.match(query) ||
                        biz.neighborhood.parameterize.match(query)
                        @businesses.push(biz)
                    end
                end
        end

        # @businesses = Business.where("name LIKE ? OR category LIKE ? OR price LIKE ?", "%#{Business.sanitize_sql_like(query)}%", "%#{query}%", "%#{query}%")
        # render json: @businesses

        # @businesses = Business.where("name LIKE ? OR category LIKE ? OR price LIKE ? OR neighborhood LIKE ?", "%{#query}%", "%{#query}%", "%{#query}%", "%{#query}%")
        if (@businesses && @businesses.length > 0)
            render :index
        else
            # render json: { message: @businesses.length }, status: 404
            render json: ["No results found for #{query}"], status: 404
        end
    end

    private

    def business_params
        params.require(:business).permit(
            :id,
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
