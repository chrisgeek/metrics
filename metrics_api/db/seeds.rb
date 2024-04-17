# Seed file, the seeded data can also be read from an external file

metric_names = %w[stocks humidity temperature]
timestamps = [DateTime.now, DateTime.now + 5.minutes, DateTime.now + 2.hours]
values = (5.5..100).step(4.2).to_a.map { |i| i.round(2) }

p 'Seeding Metrics Data'
20.times do
  Metric.create!(name: metric_names.sample, timestamp: timestamps.sample, value: values.sample)
rescue ActiveRecord::RecordInvalid => e
  p "Error creating metric: #{e.message}"
end
