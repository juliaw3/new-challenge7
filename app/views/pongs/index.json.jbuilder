json.array!(@pongs) do |pong|
  json.extract! pong, :id
  json.url pong_url(pong, format: :json)
end
