require 'sinatra'
require 'json'

configure do
  disable :protection # Avoid prevention of OPTIONS requests to check if CS is allowed
  set :port, 4569
end

before do
  headers('Access-Control-Allow-Origin' => request.env['HTTP_ORIGIN'] || '*',
          'Access-Control-Allow-Credentials' => 'true')
end

options '/*' do
  headers('Access-Control-Allow-Headers' => 'X-Requested-With, X-Prototype-Version, X-CSRF-Token',
          'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS',
          'Access-Control-Max-Age' => '5')
  content_type 'text/plain'
  ""
end

get '/test_get.js' do
  content_type :json
  {"message" => "GET with successful server response", "foo" => params[:foo]}.to_json
end

post '/test_post.js' do
  content_type :json
  {"message" => "POST with successful server response", "foo" => params[:foo]}.to_json
end
