require 'rails_helper'

RSpec.describe "pongs/show", type: :view do
  before(:each) do
    @pong = assign(:pong, Pong.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
