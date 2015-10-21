require 'rails_helper'

RSpec.describe "pongs/edit", type: :view do
  before(:each) do
    @pong = assign(:pong, Pong.create!())
  end

  it "renders the edit pong form" do
    render

    assert_select "form[action=?][method=?]", pong_path(@pong), "post" do
    end
  end
end
