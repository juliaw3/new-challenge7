json.array!(@comments) do |comment|
  json.extract! comment, :id, :usesr_name, :string, :body, :idea_id
  json.url comment_url(comment, format: :json)
end
