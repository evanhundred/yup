class Api::ReviewsController < ApplicationController
    def create
        @review = Review.new(review_params)
        @review.author_id = params[:user_id]
        unless @review.save
            render json: { errors: @review.errors.full_messages }, status: 422 # :unprocessable_entity
        end
    end

    def destroy
        review = Review.find(params[:id])
        unless review.destroy
            render json: { errors: @review.errors.full_messages }, status: 422 # :unprocessable_entity
        end
    end

    def edit
        @review = Review.find(params[:id])
        if current_user == User.find(@review.author_id)
            render :edit
        end
    end

    def update
        @review = Review.find(params[:id])

    end

end
