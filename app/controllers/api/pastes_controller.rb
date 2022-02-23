class Api::PastesController < ApplicationController
    before_action :set_paste, only: %i[ show update destroy ]
    skip_before_action :verify_authenticity_token

  def index
    count = Paste.count
    @pastes = Paste.limit(8).order("updated_at DESC").where(privacy:0)
  end

  def show
    user = current_user
    user_id = user.nil? ? 1 : user.id
    if @paste.nil?
      render json: {errors:['Could not locate paste']}, status:404
    elsif @paste && (@paste.user_id == user_id || @paste.privacy < 2)
      render :show
    elsif @paste.privacy == 2 && @paste.user_id != user_id
      render json: {errors:['That paste is private']}, status:403
    else
      render json: {errors:['Something went wrong']}, status:400
    end
  end

  def create
    @paste = Paste.new(paste_params)
    @paste.set_user(current_user)
    if @paste.save
      render :show
    else
      render json: {errors: @paste.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    if @paste && @paste.update(paste_params) && @paste.user == current_user && @paste.user.id > 1
        render :show
    elsif !@paste
        render json: {errors: ['Could not locate paste']}, status:400
    else
        render json: {errors: @paste.errors.full_messages}, status: :unprocessable_entity
    end
  end

    def destroy
        if @paste && @paste.user == current_user && @paste.user.id > 1
            @paste.destroy
        elsif !@paste
            render json: {errors: ['Could not locate paste']}, status:400
        else
            render json: {errors: ["You're not allowed to do that"]}, status: :unprocessable_entity
        end
    end

private
    # Use callbacks to share common setup or constraints between actions.
    def set_paste
      @paste = Paste.find_by(id:params[:id])
    end

    # Only allow a list of trusted parameters through.
    def paste_params
      params.require(:paste).permit(:content, :expiration_selection, :privacy, :title)
    end

end
