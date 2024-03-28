# frozen_string_literal: true

# share business email
class ShareBizMailer < ApplicationMailer
  default from: 'notifications@yup.com'

  def share_biz_email
    @sender = params[:sender]
    @recepient = params[:recepient]
    @business = params[:business]
    mail(to: @recepient.email, subject: "#{@sender.name} recommends #{@business.name}.")
  end
end
