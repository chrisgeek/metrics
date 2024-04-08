# frozen_string_literal: true

FactoryBot.define do
  factory :metric do
    timestamp { Faker::Time.between(from: 3.days.ago, to: 1.day.ago) }
    name { %w[Temperature Sales Stock].sample }
    value { Faker::Number.decimal(l_digits: 2) }
  end
end
