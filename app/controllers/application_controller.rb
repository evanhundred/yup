# frozen_string_literal: true

# Provides publically accessible methods and fields
class ApplicationController < ActionController::API
  rescue_from StandardError, with: :unhandled_error
  rescue_from ActionController::InvalidAuthenticityToken,
              with: :invalid_authenticity_token
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  helper_method :current_user, :require_logged_in

  before_action :snake_case_params, :attach_authenticity_token

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    return if current_user

    render json: { message: 'Unauthorized' }, status: :unauthorized
  end

  private

  def snake_case_params
    params.deep_transform_keys!(&:underscore)
  end

  def attach_authenticity_token
    headers['X-CSRF-Token'] = masked_authenticity_token(session)
  end

  def invalid_authenticity_token
    render json: { message: 'Invalid authenticity token' },
           status: :unprocessable_entity
  end

  def unhandled_error(error)
    raise error if request.accepts.first.html?

    @message = "#{error.class} - #{error.message}"
    @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
    render 'api/errors/internal_server_error', status: :internal_server_error

    logger.error "\n#{@message}:\n\t#{@stack.join "\n\t"}\n"
  end
end
