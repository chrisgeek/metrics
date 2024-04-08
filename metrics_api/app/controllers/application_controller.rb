class ApplicationController < ActionController::API
  def success_response(object, status = :ok)
    render json: object, status: status
  end

  def failure_response(message)
    render json: { error: message }, status: :unprocessable_entity
  end
end
