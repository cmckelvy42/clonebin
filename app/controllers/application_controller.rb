class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    helper_method :current_user
    def current_user
        return nil unless session[:token]
        @current_user ||= User.find_by(session_token:session[:token])
    end

    def login_user!(user)
        session[:token] = user.reset_session_token
    end

    def login_guest!
        session[:token] = User.first.session_token
    end

    def logged_in?
        return !!current_user
    end

    def logout_user
        current_user.reset_session_token
        session[:token] = nil
        @current_user = nil
    end

    def require_user
        redirect_to login_url unless logged_in?
    end
end