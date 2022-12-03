class ApplicationController < ActionController::API
    before_action :snake_case_parems

    private

    def snake_case_parems
        params.deep_transform_keys!(&underscore)
    end
end
