class Metric < ApplicationRecord
  validates :name, presence: true
  validates :timestamp, presence: true
  validates :value, presence: true, numericality: true
end
