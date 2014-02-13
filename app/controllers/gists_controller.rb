class GistsController < ApplicationController

  def index
    @current_user_gists = current_user.gists
    render json: @current_user_gists
  end

  def create
    gist = Gist.new(params[:gist])
    gist.owner_id = current_user.id

    if gist.save
      render json: gist
    else
      render json: gist.errors, status: 422
    end
  end
end
