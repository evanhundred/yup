# frozen_string_literal: true

module Api
  # Provides publically accessible methods and fields for businesses
  class BusinessesController < ApplicationController
    wrap_parameters include: Business.attribute_names + %w[openAt closedAt]

    before_action :set_business, only: %i[show update destroy]
    # before_action :set_business, only: [:show, :update, :destroy]
    before_action :require_owner, only: %i[update destroy]

    def index
      @businesses = Business.all
      @users = User.all
      @current_user = current_user
      render :index
    end

    def show
      render :show
    end

    def create
      @business = Business.new(business_params)

      if @business.save
        render :show, status: :created
      else
        render_errors(@business.errors.full_messages, :unprocessable_entity)
      end
    end

    def update
      if @business.update(business_params)
        render :show
      else
        render_errors(@business.errors.full_messages, :unprocessable_entity)
      end
      # @business = Business.find(params[:id])
      # if @business.user_is_owner(current_user) && @business.update(business_params)
      #   render :show
      # else
      #   render json: { errors: @business.errors.full_messages }, status: 422
      # end
    end

    def destroy
      if @business.destroy
        render json: { message: 'Business deleted successfully' }, status: ok
      else
        render_errors(@business.errors.full_messages, :unprocessable_entity)
        # render json: { errors: @business.errors.full_messages }, status: 422
      end
    end

    # rubocop:disable Metrics/MethodLength
    def search
      query = params[:query]&.parameterize

      if query.blank?
        render_errors(['Search query cannot be empty'], :bad_request)
        return
      end

      @businesses = Business.all.select { |biz| business_matches_query(biz, query) }

      if @businesses.any?
        render :index
      else
        render_errors(["No results found for '#{params[:query]}'"], :not_found)
      end
    end
    # rubocop:enable Metrics/MethodLength

    private

    def set_business
      @business = Business.find_by(id: params[:id])

      return if @business

      render_errors(['Business not found'], :not_found)
    end

    def require_owner
      return if @business&.user_is_owner(current_user)

      render_errors(['You must be the owner to perform this action'], :forbidden)
    end

    # def test_businesses_for_search(businesses, query)
    #   result = []
    #   businesses.each do |biz|
    #     result.push(biz) if business_matches_query(biz, query)
    #   end
    #   result
    # end

    def business_matches_query(business, query)
      fields = [business.name, business.category, business.price, business.neighborhood]
      fields.any? { |field| field&.parameterize&.match(query) }
    end

    # Standardized error response format
    def render_errors(messages, status)
      render json: { errors: Array(messages) }, status:
    end

    def business_params # rubocop:disable Metrics/MethodLength
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
  end
end
