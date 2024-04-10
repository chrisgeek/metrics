require 'rails_helper'

RSpec.describe Metric, type: :model do
  describe 'Validations' do
    let(:metric) { build(:metric) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:timestamp) }
    it { is_expected.to validate_presence_of(:value) }
    it { is_expected.to validate_numericality_of(:value) }

    it { expect { metric.save }.to change(Metric, :count).by(1) }
  end

  describe '.average_by_timeframe' do
    let(:time) { Time.current.beginning_of_day }
    let(:average_by_timeframe) { described_class.average_by_timeframe(timeframe) }

    before :each do
      create(:metric, :sales, value: 44.22, timestamp: time)
      create(:metric, :sales, value: 14.5, timestamp: time + 10.seconds)
      create(:metric, :sales, value: 24.3, timestamp: time + 30.seconds)
      create(:metric, :sales, value: 28.57, timestamp: time + 30.minutes)
      create(:metric, :sales, value: 25.18, timestamp: time + 4.hours)
      create(:metric, :sales, value: 20.62, timestamp: time + 1.day)
    end

    context 'per minute timeframe' do
      let(:timeframe) { 'minute' }
      let(:average_value) { 27.673333333333332 } # (44.1 + 24.3 + 14.5 / 3)
      let(:payload) { average_by_timeframe.select { |i| i.selected_timeframe == time.strftime('%Y-%m-%d %H:%M:00') } }

      it 'returns the average value by minute' do
        # debugger
        expect(payload[0].average_value.to_f).to eq(average_value)
        expect(payload[0].count).to eq(3)
      end
    end

    context 'hourly timeframe' do
      let(:timeframe) { 'hour' }
      let(:average_value) { 27.8975 } # (44.1 + 24.3 + 14.5 + 28.57 / 4)
      let(:payload) { average_by_timeframe.select { |i| i.selected_timeframe == time.strftime('%Y-%m-%d %H:00:00') } }

      it 'returns hourly average' do
        expect(payload[0].average_value.to_f).to eq(average_value)
        expect(payload[0].count).to eq(4)
      end
    end

    context 'daily timeframe' do
      let(:timeframe) { 'day' }
      let(:average_value) { 27.354 } # (44.1 + 24.3 + 14.5 + 28.57 + 25.18 / 5)
      let(:payload) { average_by_timeframe.select { |i| i.selected_timeframe == time.strftime('%Y-%m-%d 00:00:00') } }

      it 'returns daily average' do
        expect(payload[0].average_value.to_f).to eq(average_value)
        expect(payload[0].count).to eq(5)
      end
    end
  end

  describe '.check_input' do
    context 'with invalid input' do
      it { expect(described_class.check_input('invalid input')).to eq 'hour' }
    end

    context 'with valid input' do
      it { expect(described_class.check_input('minute')).to eq 'minute' }
    end
  end
end
