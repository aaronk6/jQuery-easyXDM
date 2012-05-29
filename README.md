# jQuery-EasyXDM plugin

**Homepage**:     [https://github.com/GyldendalDigital/jQuery-EasyXDM](https://github.com/GyldendalDigital/jQuery-EasyXDM)

# Introduction

The jQuery-EasyXDM plugin modifies the [jQuery.ajax()](http://api.jquery.com/jQuery.ajax/)
method to automatically use [easyXDM](http://easyxdm.net), written by Øivind Kinsey, when the browser does
 not support
[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en/http_access_control)
(particularly useful for IE6, IE7 and IE8).

This plugin contains also an easy to setup test example supporting the CORS
standard (see the Test section).


# Usage

This plugin requires an already setup web server or web application with
cross-site access controls support enabled, i.e. a server returning HTTP
responses containing proper headers.

## Producer

The server already providing support for CORS, must have both the easyXDM
library and the jQuery-EasyXDM plugin files residing on the server.

1. Install easyXDM library:

<pre class="note">
    $ cd PROJECT_ROOT/public
    $ mkdir easyXDM && cd easyXDM
    $ wget http://cloud.github.com/downloads/oyvindkinsey/easyXDM/easyXDM-2.4.15.118.zip
    $ unzip easyXDM-2.4.15.118.zip
    $ rm -rf easyXDM-2.4.15.118.zip example tests cors
</pre>

2.  Install jQuery-EasyXDM plugin:

<pre class="note">
    $ git clone git@github.com:GyldendalDigital/jQuery-EasyXDM.git /tmp/jQuery-EasyXDM
    $ cp -v /tmp/jQuery-EasyXDM/jquery.easyXDM.* javascripts/
      `/tmp/jQuery-EasyXDM/jquery.easyXDM.js' -> `javascripts/jquery.easyXDM.js'
      `/tmp/jQuery-EasyXDM/jquery.easyXDM.provider.html' -> `javascripts/jquery.easyXDM.provider.html'
      `/tmp/jQuery-EasyXDM/jquery.easyXDM.provider.js' -> `javascripts/jquery.easyXDM.provider.js'
</pre>

With this library and plugin, the server will now correctly handle CORS requests
from browsers not supporting CORS.

## Consumer

The sites integrating towards the server with CORS enabled, must include the
jQuery-EasyXDM plugin, so the client/browser asking for a resource on the
server, sends HTTP requests containing proper headers.

<pre class="note">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
  <script type="text/javascript" src="/javascripts/jquery.easyXDM.js"></script>
</pre>

**Note**: adding the *jquery.easyXDM.debug=true* parameter to the page that
includes the jQuery-EasyXDM plugin enable easyXDM debugging.


### Testing

**1. Edit the hosts file**:

<pre class="note">
    $ tail -2 /etc/hosts
    ### Test CORS
    127.0.0.1       consumer.example.com producer.example.net
</pre>

**2. Download easyXDM and**:

<pre class="note">
    $ git clone git@github.com:GyldendalDigital/jQuery-EasyXDM.git
    $ cd jQuery-EasyXDM && pushd test/public
    $ mkdir easyXDM && cd easyXDM
    $ wget http://cloud.github.com/downloads/oyvindkinsey/easyXDM/easyXDM-2.4.15.118.zip
    $ unzip easyXDM-2.4.15.118.zip
    $ rm -rf easyXDM-2.4.15.118.zip example tests cors
    $ popd
    $ sudo gem install sinatra --no-rdoc --no-ri
    $ ruby test/app.rb
</pre>

**3. Browse to the demo page**:

<pre class="note">
    $ firefox http://consumer.example.com:4567/
</pre>

For running with easyXDM debugging enabled access the
http://consumer.example.com:4567/index.html?jquery.easyXDM.debug=true page.

## Document generation

    $ sudo gem install redcarpet --version=2.1.1 --no-rdoc --no-ri
    $ sudo gem install yard      --version=0.8.1 --no-rdoc --no-ri

    $ yardoc --no-stats --markup markdown --format html --title README --output-dir /tmp --one-file - README.md
    $ firefox /tmp/index.html


# Bugs

Report bugs on https://github.com/GyldendalDigital/jQuery-EasyXDM/issues


# License

(The MIT License)

Copyright © 2012 Gyldendal Digital

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
‘Software’), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
