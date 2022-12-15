class Api::ReviewsController < ApplicationController
    before_action :require_logged_in

    def new
    end

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
        else
            render json: { errors: ['Something went wrong.']}
        end
    end

    def update
        @review = Review.find(params[:id])
        if current_user == User.find_by(id: @review.author_id) && @review.update(review_params)
            render json: { 'Success.'}
            # redirect_to '/'
        else
            render json: { errors: ['Something went wrong.'] }
        end
    end

    def review_params
        params.require[:review].permit(:rating, :body, :author_id, :user_id)
    end
end
