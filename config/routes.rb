Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post 'api/test', to: 'application#test'
  Rails.application.routes.draw do
    namespace :api, defaults: { format: :json } do
      resources :users, only: :create
      resource :session, only: [:show, :create, :destroy]
      resources :businesses, only: [:index, :show] do
        resources :reviews, only: [:new, :create, :destroy, :edit, :update]
      end
    end
  end

  get '*path', to: 'static_pages#frontend_index'
end
