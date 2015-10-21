require 'rails_helper'

RSpec.describe "pongs/new", type: :view do
  before(:each) do
    assign(:pong, Pong.new())
  end

  it "renders new pong form" do
    render

    assert_select "form[action=?][method=?]", pongs_path, "post" do
    end
  end
end
