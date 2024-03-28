# frozen_string_literal: true

json.extract! @review, :id, :author_id, :business_id, :body, :rating, :created_at, :updated_at
