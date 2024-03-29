# frozen_string_literal: true

module Api
  # Provides publically accessible methods and fields for businesses
  class BusinessesController < ApplicationController
    wrap_parameters include: Business.attribute_names + %w[openAt closedAt]
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
        render :show
      else
        render json: @business.errors.full_messages, status: 404
      end
    end

    def create
      @business = Business.new(business_params)
      if @business.save
        render :show
      else
        render json: { errors: @business.errors.full_messages }, status: 422
      end
    end

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
      if @business&.destroy
        render json: { message: 'success' }, status: 200
      else
        render json: { errors: @business.errors.full_messages }, status: 422
      end
    end

    def search
      query = params[:query].parameterize
      @businesses = []
      businesses = Business.all
      @businesses.concat(test_businesses_for_search(businesses, query))

      if @businesses&.length&.positive?
        render :index
      else
        render json: ["No results found for #{query}"], status: 404
      end
    end

    private

    def test_businesses_for_search(businesses, query)
      result = []
      businesses.each do |biz|
        result.push(biz) if business_matches_query(biz, query)
      end
      result
    end

    def business_matches_query(business, query)
      fields = [business.name, business.category, business.price, business.neighborhood]
      fields.each do |field|
        return true if field&.parameterize&.match(query)
      end
      false
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
