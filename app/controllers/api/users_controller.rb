class Api::UsersController < ApplicationController
    before_action :set_user, only: %i[ show update destroy ]
    skip_before_action :verify_authenticity_token

  def show
    if @user && @user.id > 1
      if @user == current_user
        if (params[:query])
          searchString = "%#{params[:query]}%".downcase
          @pastes = @user.pastes.where('LOWER(content) like ? OR LOWER(title) like ?', searchString, searchString)
        else
          @pastes = @user.pastes
        end
        render :show
      else
          if (params[:query])
            searchString = "%#{params[:query]}%".downcase
            @pastes = @user.pastes.where('LOWER(content) like ? OR LOWER(title) like ? AND privacy=0', searchString, searchString)
          else
            @pastes = @user.pastes.where(privacy:0)
          end
        render :show
      end
    else
      render json: {errors: ['Could not locate user']}, status:404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render "/api/session/current_user"
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    print user_params
    if @user && @user == current_user &&  @user.update(user_params) && @user.id > 1
      render "/api/session/current_user"
    elsif !@user
        render json: {errors: ['Could not locate user']}, status:404
    else
        render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

    def destroy
        if @user && @user == current_user && @user.id > 1
          logout_user  
          @user.destroy
        elsif !@user
            render json: {errors: ['Could not locate user']}, status:404
        else
            render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
    end

private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      print params
      @user = User.find_by(name:params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :picture_url)
    end
end
