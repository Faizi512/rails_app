Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "pages#index"
  get "/aus", to: "pages#aus"
  get "/terms-and-condition", to:"pages#terms_condition"
  get "/cookie-policy", to:"pages#cookie_policy"
  get "/risk-and-warnings", to:"pages#risk_and_warnings"
  get "/privacy-policy", to:"pages#privacy_policy"
end
