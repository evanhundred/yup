class BizPhotoBoxesController < ApplicationController
    def show
        @biz_photo_box = BizPhotoBox.find(params[:business_id])
        if @biz_photo_box
            render :show
        else
            render json: @biz_photo_box.errors.full_messages, status: 404
        end
    end
end
