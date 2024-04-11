module Api
  module V1
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
        if @metric.update(metric_params)
          success_response(@metric)
        else
          failure_response(@metric.errors)
        end
        # @metric.update(metric_params) ? success_response(@metric) : failure_response(@metric.error) # perhaps I will refactor to use one liners
      end

      def destroy
        if @metric.destroy
          render status: :no_content
        else
          failure_response('Failed to destroy metric')
        end
      end

      def averages
        if valid_timeframes?
          averages = Metric.average_by_timeframe(params[:timeframe])
          success_response(averages)
        else
          failure_response('Invalid timeframe, must be either minute, hour or day')
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

      def valid_timeframes?
        Metric::TIMEFRAMES.include?(params[:timeframe])
      end
    end
  end
end
