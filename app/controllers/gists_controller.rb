class GistsController < ApplicationController

  def index
    @current_user_gists = current_user.gists
    render json: @current_user_gists.map(&:as_json)
  end
end
