class Api::ReviewsController < ApplicationController
    def create
        @review = Review.new(review_params)
        unless @review.save
            render json: { errors: @review.errors.full_messages }, status: 422 # :unprocessable_entity
        end
    end

    def destroy
        review = Review.find(params[:id])

    end

    def edit

    end

    def update

    end

end
