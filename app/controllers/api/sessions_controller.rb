class Api::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def create
        @user = User.lookup_by_name(params[:user][:name], params[:user][:password])
        if @user.nil? || @user.id == 1
            render json: {errors:['Nope. Wrong credentials!']}, status: 401
        else
            puts "here"
            login_user!(@user)
            render "/api/session/current_user"
        end
    end

    def destroy
        logout_user
        render json: { message: 'Logout successful.' }
      end
end