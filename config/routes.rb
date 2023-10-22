Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post 'api/test', to: 'application#test'
  Rails.application.routes.draw do
    namespace :api, defaults: { format: :json } do
      resources :saved_businesses, only: [:create, :destroy]
      resources :users, only: [:create, :show]
      resource :session, only: [:show, :create, :destroy]
      resources :businesses, only: [:index, :show, :create] do
        resources :reviews, only: [:index, :new, :create, :destroy, :edit, :update]
        collection do
          post :search
        end
      end
    end
  end

  get '*path', to: 'static_pages#frontend_index'
end
