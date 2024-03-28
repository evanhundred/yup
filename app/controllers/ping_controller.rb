# frozen_string_literal: true

# provides ping method
class PingController < ApplicationController
  def pong
    render status: :ok, body: 'PONG'
  end
end
