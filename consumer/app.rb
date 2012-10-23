require 'sinatra'

configure do
  set :port, 4568
end

get '/' do
  redirect '/index.html'
end
