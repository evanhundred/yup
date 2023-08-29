Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post 'api/test', to: 'application#test'
  Rails.application.routes.draw do
    namespace :api, defaults: { format: :json } do
      post 'save_business', to: 'users#save_business'
      resources :users, only: :create
      # resources :users, do
      #   post :save_business
      # end
      resource :session, only: [:show, :create, :destroy]
      # resources :biz_photo_boxes, only: [:create, :index]
      resources :businesses, only: [:index, :show] do
        resources :reviews, only: [:index, :new, :create, :destroy, :edit, :update]
        resource :biz_photo_box, only: [:show]
      end
    end
    # resources :biz_photo_boxes, only: [:show]
  end

  get '*path', to: 'static_pages#frontend_index'
end
