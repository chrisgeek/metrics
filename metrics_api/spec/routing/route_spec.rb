require 'rails_helper'

RSpec.describe 'Routing', type: :routing do
  describe 'Metrics' do
    let(:p) { '/api/v1/metrics' }
    let(:c) { 'api/v1/metrics#' }

    it { is_expected.to route(:get, p).to "#{c}index" }
    it { is_expected.to route(:get, "#{p}/1").to "#{c}show", id: 1 }
    it { is_expected.to route(:post, p).to "#{c}create" }
    it { is_expected.to route(:patch,  "#{p}/1").to "#{c}update", id: 1 }
    it { is_expected.to route(:delete, "#{p}/1").to "#{c}destroy", id: 1 }
    it { is_expected.to route(:get, "#{p}/averages").to "#{c}averages" }
  end
end
