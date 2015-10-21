require "rails_helper"

RSpec.describe PongsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/pongs").to route_to("pongs#index")
    end

    it "routes to #new" do
      expect(:get => "/pongs/new").to route_to("pongs#new")
    end

    it "routes to #show" do
      expect(:get => "/pongs/1").to route_to("pongs#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/pongs/1/edit").to route_to("pongs#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/pongs").to route_to("pongs#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/pongs/1").to route_to("pongs#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/pongs/1").to route_to("pongs#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/pongs/1").to route_to("pongs#destroy", :id => "1")
    end

  end
end
