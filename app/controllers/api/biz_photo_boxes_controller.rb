# frozen_string_literal: true

module Api
  # provides bizPhotoBoxes methods
  class BizPhotoBoxesController < ApplicationController
    wrap_parameters include: BizPhotoBox.attribute_names + ['businessId']

    # def index
    #     @biz_photo_boxes = BizPhotoBox.all
    # end

    # create ? add biz_photo entity, so it can be created?
    # edit/update ?

    def show
      @biz_photo_box = BizPhotoBox.find(params[:business_id])
      if @biz_photo_box
        render :show
      else
        render json: @biz_photo_box.errors.full_messages, status: 404
      end
    end
  end
end
