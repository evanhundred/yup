# frozen_string_literal: true

json.extract! @user, :id, :email, :name, :created_at, :updated_at
json.partial! 'api/users/saved_businesses', locals: { user: @user }
json.partial! 'api/users/owned_businesses', user: @user
