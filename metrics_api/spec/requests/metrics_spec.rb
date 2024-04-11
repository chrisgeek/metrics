require 'rails_helper'

RSpec.describe 'Metrics', type: :request do
  describe 'GET /metrics' do
    before do
      @metric1 = create(:metric)
      @metric2 = create(:metric)

      get '/api/v1/metrics'
    end

    it { expect(response).to have_http_status(:ok) }
    it { expect(response.content_type).to include('application/json') }
    it { expect(response.body).to include(@metric1.name) }
    it { expect(response.body).to include(@metric2.name) }
    it { expect(response.body).not_to include('Random Name') }
  end

  describe 'GET /metrics/:id' do
    context 'with valid id' do
      before do
        @metric1 = create(:metric)
        @metric2 = create(:metric, name: 'Humidity')

        get "/api/v1/metrics/#{@metric1.id}"
      end

      it { expect(response).to have_http_status(:ok) }
      it { expect(response.content_type).to include('application/json') }
      it { expect(response.body).to include(@metric1.name) }
      it { expect(response.body).not_to include(@metric2.name) }
    end

    context 'with invalid id' do
      before { get '/api/v1/metrics/0' }

      it { expect(response).to have_http_status(:not_found) }
    end
  end

  describe 'POST /metrics' do
    let(:valid_params) { { name: 'Temperature', timestamp: 5.minutes.ago, value: 12.89 } }
    let(:send_request_with_valid_params) { post '/api/v1/metrics', params: { metric: valid_params } }

    context 'with valid parameters' do
      it { expect { send_request_with_valid_params }.to change(Metric, :count).by(1) }

      it 'returns the created(201) status code' do
        send_request_with_valid_params
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) { { metric: { name: 'Stock', timestamp: 3.minutes.ago, value: nil } } }

      it 'does not create a new metric' do
        expect { post '/api/v1/metrics', params: invalid_params }.to_not change(Metric, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'returns the created record' do
      before { send_request_with_valid_params }

      it { expect(response.body).to include(valid_params[:name]) }
      it { expect(response.body).to include(valid_params[:value].to_s) }
      it { expect(Time.zone.parse(response.parsed_body[:timestamp])).to eq(Time.zone.parse(valid_params[:timestamp].to_s)) }
    end
  end

  describe 'PUT /metrics/:id' do
    let(:metric) { create(:metric, name: 'Stock', value: 199) }
    let(:valid_attributes) do
        { name: 'Humidity', value: 98.76 }
    end
    let(:send_request_with_valid_params) { put "/api/v1/metrics/#{metric.id}", params: { metric: valid_attributes } }

    context 'with valid attributes' do
      before do
        send_request_with_valid_params
        metric.reload
      end

      it 'updates the record' do
        expect(metric.name).to eq(valid_attributes[:name])
        expect(metric.value).to eq(valid_attributes[:value])
        expect(response).to have_http_status(:ok)
      end

      it 'returns the updated record' do
        expect(response.body).to include(valid_attributes[:name])
        expect(response.body).to include(valid_attributes[:value].to_s)
      end
    end

    context 'with invalid attributes' do
      let(:invalid_attributes) do
        { name: 'Humidity', value: 'invalid_value', timestamp: nil }
      end

      it 'does not update record' do
        put "/api/v1/metrics/#{metric.id}", params: { metric: invalid_attributes }
        metric.reload

        expect(metric.name).not_to eq(invalid_attributes[:name])
        expect(metric.value).not_to eq(invalid_attributes[:value])
        expect(metric.value).not_to eq(invalid_attributes[:timestamp])
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /metrics/:id' do
    context 'when the metric exists' do
      before do
        @metric = create(:metric)

        delete "/api/v1/metrics/#{@metric.id}"
      end

      it { expect(response).to have_http_status(:no_content) }
      it { expect { @metric.reload }.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context 'when the metric does not exist' do
      before { delete '/api/v1/metrics/0' }

      it { expect(response).to have_http_status(:not_found) }
    end
  end

  describe 'GET /metrics/averages' do
    context 'when param is valid' do
      before do
        @metric = create(:metric, timestamp: Time.current.beginning_of_day)
        get '/api/v1/metrics/averages', params: { timeframe: 'minute' }
      end

      it { expect(response.body).to include(@metric.name) }
    end

    context 'when param is invalid' do
      before { get '/api/v1/metrics/averages', params: { timeframe: 'invalid' } }

      it { expect(response.body).to include('Invalid timeframe, must be either minute, hour or day') }
    end
  end
end
