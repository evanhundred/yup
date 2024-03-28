# frozen_string_literal: true

# provides index page method
class StaticPagesController < ActionController::Base
  def frontend_index
    render file: Rails.root.join('public', 'index.html')
  end
end
