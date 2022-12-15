class Api::ReviewsController < ApplicationController
    wrap_parameters include: Review.attribute_names + ['authorId'] + ['businessId']
    before_action :require_logged_in, only: [:new, :create, :edit, :update, :destroy]

    def index
        # @reviews = Review.all
        @reviews = Review.all.where(business_id: params[:business_id])
        render :index
    end

    def new
        @business = Business.find(params([:id]))
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
            render json: 'Success.'
            # redirect_to '/'
        else
            render json: { errors: ['Something went wrong.'] }
        end
    end

    def review_params
        params.require[:review].permit(:rating, :body, :author_id, :user_id)
    end
end
