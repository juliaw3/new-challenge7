class PongsController < ApplicationController
  before_action :set_pong, only: [:show ]

  # GET /pongs
  # GET /pongs.json
  def index
    @pongs = Pong.all
  end



  # PATCH/PUT /pongs/1
  # PATCH/PUT /pongs/1.json
  def update
    respond_to do |format|
      if @pong.update(pong_params)
        format.html { redirect_to @pong, notice: 'Pong was successfully updated.' }
        format.json { render :show, status: :ok, location: @pong }
      else
        format.html { render :edit }
        format.json { render json: @pong.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pongs/1
  # DELETE /pongs/1.json
  def destroy
    @pong.destroy
    respond_to do |format|
      format.html { redirect_to pongs_url, notice: 'Pong was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pong
      @pong = Pong.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pong_params
      params[:pong]
    end
end
