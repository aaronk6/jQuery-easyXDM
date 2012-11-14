require 'sinatra'
require 'json'

configure do
  disable :protection # Avoid prevention of OPTIONS requests to check if CS is allowed
  set :port, 4569
end

before do
  headers('Access-Control-Allow-Origin' => request.env['HTTP_ORIGIN'] || '*',
          'Access-Control-Allow-Credentials' => 'true',
          'Cache-Control' => 'max-age=0, private')
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

get '/test_get_with_cookie_return.js' do
  headers('Set-Cookie' => 'jquery_easyXDM_test_cookie=level1; Path=/; Max-Age=100')
  content_type :json
  {"message" => "GET with successful server response", "foo" => params[:foo]}.to_json
end

get '/test_get_with_credentials.js' do
  content_type :json
  if request.cookies['jquery_easyXDM_test_cookie'] == 'level1'
    headers('Set-Cookie' => 'jquery_easyXDM_test_cookie=level2; Path=/; Max-Age=100')
    {"message" => "GET with successful server response", "foo" => params[:foo]}.to_json
  else
    puts "OOPS! Wrong cookie value(s) received: #{request.cookies.inspect}"
    {"message" => "GET with unsuccessful server response", "cookies" => request.cookies}.to_json
  end
end

post '/test_post_with_credentials.js' do
  content_type :json
  if request.cookies['jquery_easyXDM_test_cookie'] == 'level2'
    headers('Set-Cookie' => 'jquery_easyXDM_test_cookie=level3; Path=/; Max-Age=100')
    {"message" => "POST with successful server response", "foo" => params[:foo]}.to_json
  else
    puts "OOPS! Wrong cookie value(s) received: #{request.cookies.inspect}"
    {"message" => "GET with unsuccessful server response", "cookies" => request.cookies}.to_json
  end
end
