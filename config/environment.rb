# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

Jbuilder.key_format camlize: :lower
Jbuilder.deep_format_keys true
