require 'rails_helper'

RSpec.describe "pongs/index", type: :view do
  before(:each) do
    assign(:pongs, [
      Pong.create!(),
      Pong.create!()
    ])
  end

  it "renders a list of pongs" do
    render
  end
end
