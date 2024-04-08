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
end
