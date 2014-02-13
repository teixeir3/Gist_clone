class FavoritesController < ApplicationController

  def index
    render json: current_user.favorites
  end

  def create
    favorite = Favorite.new(
      gist_id: params[:gist_id],
      user_id: current_user.id
    )

    if favorite.save
      render json: favorite
    else
      render favorite.errors, status: 422
    end
  end

  def destroy
    favorite = Favorite.find_by_gist_id_and_user_id(
      params[:gist_id],
      current_user.id
    )

    favorite.destroy
    render json: nil
  end

end
