EasyXDM plugin for jQuery
=========================

Uses easyXDM as the ajax transport when the browser don't support
CORS.


Install
-------

Clone the git repository:

    git clone git://github.com/GyldendalDigital/jQuery-EasyXDM.git
    
Or download the project as a zip file from
https://github.com/GyldendalDigital/jQuery-EasyXDM/zipball/master


Usage
-----

Options supported by easyXDM.Rpc.request()

 - url:     FIXME
 - type:    GET, POST, etc.
 - headers: FIXME
 - timeout: the number of milliseconds before a timeout occurs.
 - data:    A map
 - dataType: json
 - success: FIXME
 - error:   FIXME

FIXME set defaults to ensure consistent behaviour?


Development
-----------

### Testing

Add to /etc/hosts

    ### Test CORS
    127.0.0.1       foo.example.com, bar.example.net

Then

    cd test
    mkdir easy_xdm
    cd !$
    wget http://cloud.github.com/downloads/oyvindkinsey/easyXDM/easyXDM-2.4.15.118.zip
    unzip !!:t
    gem install sinatra
    cp ../jquery.easyXDM.js public
    ruby app.rb

Open a browser and go to http://foo.example.com:4567/


Bugs
----

Report bugs on https://github.com/GyldendalDigital/jQuery-EasyXDM/issues


License
-------

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
