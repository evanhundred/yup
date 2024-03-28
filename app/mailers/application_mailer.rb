# frozen_string_literal: true

# mailer
class ApplicationMailer < ActionMailer::Base
  default from: 'evan.hundred@gmail.com'
  layout 'mailer'
end
