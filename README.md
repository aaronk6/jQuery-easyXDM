
A method for doing cors that falls back on easyXDM.

Options supported by easyXDM.Rpc.request()

 - url:     FIXME
 - type:    GET, POST, etc.
 - headers: FIXME
 - timeout: the number of milliseconds before a timeout occurs.
 - data:    A map
 - success: FIXME
 - error:   FIXME

Be sure to specify all to get consistent behaviour.

FIXME set defaults to ensure consistent behaviour?



ruby -rwebrick -e 'WEBrick::HTTPServer.new(Port: 3000, DocumentRoot: ".").start'
wget http://cloud.github.com/downloads/oyvindkinsey/easyXDM/easyXDM-2.4.15.118.zip
