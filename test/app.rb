require 'sinatra'

before do
  headers 'Access-Control-Allow-Origin' => request.env['HTTP_ORIGIN'] || '*',
    'Access-Control-Allow-Methods' => 'GET, POST, HEAD, OPTIONS',
    'Access-Control-Allow-Credentials' => 'true',
    'Access-Control-Max-Age' => '1728000',
    'Access-Control-Allow-Headers' => 'X-Requested-With'
end
 

get '/' do
  'Hello world'
  # FIXME redirect to test.html
end

get '/test.js' do
  '{"msg": "oh yeah!"}'
end
