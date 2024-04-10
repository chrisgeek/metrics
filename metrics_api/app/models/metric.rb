class Metric < ApplicationRecord
  validates :name, presence: true
  validates :timestamp, presence: true
  validates :value, presence: true, numericality: true

  scope :average_by_timeframe, lambda { |timeframe|
    sanitized_timeframe_input = sanitize_sql(['DATE_TRUNC(?, timestamp)', check_input(timeframe)]) # sanitize to prevent sql-injection attack

    select(
      "#{sanitized_timeframe_input} as selected_timeframe, AVG(value) as average_value, count(*) as count, name"
    ).group(:name, :selected_timeframe)
  }

  TIMEFRAMES = %w[minute hour day].freeze

  def self.check_input(timeframe)
    TIMEFRAMES.include?(timeframe) ? timeframe : 'hour'
  end
end
