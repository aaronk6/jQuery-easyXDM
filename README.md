# EasyXDM plugin for jQuery


**Homepage**:     [https://github.com/GyldendalDigital/jQuery-EasyXDM](https://github.com/GyldendalDigital/jQuery-EasyXDM)

Uses [easyXDM](http://easyxdm.net) as the Ajax transport for browsers not
supporting CORS.


Document generation
-------------------

    $ sudo gem install redcarpet --version=2.1.1 --no-rdoc --no-ri
    $ sudo gem install yard      --version=0.8.1 --no-rdoc --no-ri

    $ yardoc --no-stats --markup markdown --format html --title README --output-dir /tmp --one-file - README.md
    $ firefox /tmp/index.html


Install
-------

### EasyXDM

First, [download](https://github.com/oyvindkinsey/easyXDM/downloads),
[install and configure](http://easyxdm.net/wp/category/getting-started/) easyXDM.

The plugin assumes that easyXDM is installed in the /easy_xdm directory.

### The plugin

Clone the git repository:

    git clone git://github.com/GyldendalDigital/jQuery-EasyXDM.git

Or download the project as a zip file from
https://github.com/GyldendalDigital/jQuery-EasyXDM/zipball/master

[https://github.com/GyldendalDigital/jQuery-EasyXDM/zipball/master](https://github.com/GyldendalDigital/jQuery-EasyXDM/zipball/master).

The plugin should support anything that $.ajax supports.


Usage
-----

The plugin modifies the regular `$.ajax/jQuery.ajax` method to automatically
use easyXDM when the browser does not support CORS.

To activate jquery.easyXDM.js, the file must be loaded after jQuery itself:

<span class="note">
  `<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>`
</span>
<span class="note">
  `<script type="text/javascript" src="/javascripts/jquery.easyXDM.js"></script>`
</span>

Notice that easyXDM debugging can be easily enabled by just adding the extra
parameter

<span class="note">jquery.easyXDM.debug=true</span>

to the page that loads the jquery.easyXDM plugin.

Take a look at the files in the test folder for a simple example.


Development
-----------

### Testing

**1. Edit the hosts file**:

<pre class="note">
    $ tail -2 /etc/hosts
    ### Test CORS
    127.0.0.1       foo.example.com bar.example.net
</pre>

**2. Download easyXDM and**:

<pre class="note">
    $ git clone git://github.com/GyldendalDigital/jQuery-EasyXDM.git
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
		$ firefox http://foo.example.com:4567/
</pre>

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
