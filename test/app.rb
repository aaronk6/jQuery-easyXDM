require 'sinatra'
require 'json'

configure do
  disable :protection # Avoid prevention of OPTIONS requests to check if CS is allowed
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
 
get '/' do
  redirect '/index.html'
end

get '/test.js' do
  content_type :json
  {"message" => "successful server response", "foo" => params[:foo]}.to_json
end
