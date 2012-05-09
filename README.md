EasyXDM plugin for jQuery
=========================

Uses easyXDM as the ajax transport when the browser doesn't support
CORS.


Install
-------

### EasyXDM

First you need to install and configure easyXDM. See
http://easyxdm.net for instructions. The plugin assumes that easyXDM
are installed in the /easyXDM directory.

### The plugin

Clone the git repository:

    git clone git://github.com/GyldendalDigital/jQuery-EasyXDM.git
    
Or download the project as a zip file from
https://github.com/GyldendalDigital/jQuery-EasyXDM/zipball/master

The plugin should support anything that $.ajax supports.

Usage
-----

The plugin modifies the regular $.ajax / jQuery.ajax method to automatically
use easyXDM when the browser does not support CORS.
To activate the jquery.easyXDM.js file must be loaded after jQuery itself, such
as in this example:
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
  <script type="text/javascript" src="/javascripts/jquery.easyXDM.js"></script>

Notice that easyXDM debugging can be easily enabled by just adding the extra parameter
  jquery.easyXDM.debug=true
to the page that loads the jquery.easyXDM plugin.

Take a look at the files in the test folder for a simple example.

Development
-----------

### Testing

Add to /etc/hosts

    ### Test CORS
    127.0.0.1       foo.example.com, bar.example.net

Then

    git clone git://github.com/GyldendalDigital/jQuery-EasyXDM.git
    pushd jQuery-EasyXDM
    pushd test/public
    mkdir easyXDM
    cd easyXDM
    wget http://cloud.github.com/downloads/oyvindkinsey/easyXDM/easyXDM-2.4.15.118.zip
    unzip easyXDM-2.4.15.118.zip
    popd
    sudo gem install sinatra
    ruby app.rb
    popd

Open a browser and go to http://foo.example.com:4567/
For running with easyXDM debugging enabled go to
http://foo.example.com:4567/index.html?jquery.easyXDM.debug=true


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
