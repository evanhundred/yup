class Api::BizPhotoBoxesController < ActionController::API
    def index
        @biz_photo_boxes = BizPhotoBox.all
    end
end
