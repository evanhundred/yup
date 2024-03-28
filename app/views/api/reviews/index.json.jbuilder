# frozen_string_literal: true

@reviews.each do |review|
  json.set! review.id do
    json.extract! review, :id, :author_id, :business_id, :body, :rating, :created_at, :updated_at
    json.author_name review.author_name
  end
end
