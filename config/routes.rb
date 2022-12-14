Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update]
  resources :posts
  resources :likes, only: [:index, :show, :create, :update]
  resources :comments, only: [:index, :show, :create, :update, :destroy]
  resources :messages

  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  # put '/post/:id/like', to: 'posts#like', as: 'like'


  # get '*path',
  #     to: 'fallback#index',
  #     constraints: ->(req) { !req.xhr? && req.format.html? }
end
