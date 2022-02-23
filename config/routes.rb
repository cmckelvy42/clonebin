Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :pastes, only: [:create, :destroy, :show, :update, :index]
    get 'upload', to: 'uploads#set_s3_direct_post'
    end
  root to: 'root#root'
  get '*path', to: 'root#root'

end
