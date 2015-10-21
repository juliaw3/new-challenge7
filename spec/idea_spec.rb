require "spec_helper"
require "idea"

describe Idea do 
	it "has a title" do
		idea = Idea.new
		idea.title.should be_true
	end
end

describe Attendee do
	it "tests everything"
end