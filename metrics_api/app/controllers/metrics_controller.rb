class MetricsController < ApplicationController
  before_action :set_metric, only: %i[show update destroy]

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    success_response(Metric.all)
  end

  def show
    success_response(@metric)
  end

  def create
    @metric = Metric.new(metric_params)
    if @metric.save
      success_response(@metric, :created)
    else
      failure_response(@metric.errors)
    end
  end

  def update
    if @metric.update!(metric_params)
      success_response(@metric)
    else
      failure_response(@metric.errors)
    end
  end

  def destroy
    if @metric.destroy
      render status: :no_content
    else
      failure_response('Failed to destroy metric')
    end
  end

  private

  def set_metric
    @metric = Metric.find(params[:id])
  end

  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end

  def metric_params
    params.require(:metric).permit(:name, :timestamp, :value)
  end
end
