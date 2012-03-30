(function($) {

	  jQuery.ajaxTransport(function(options, originalOptions, jqXHR) {

		    if(!$.support.cors) {
 
            return {
               
                send: function( headers, completeCallback ) {
                    if (!options.crossDomain) return;
			              $.getScript("easy_xdm/easyXDM.min.js", function() {
                        if (!(typeof(window["JSON"]) == 'object' && window["JSON"])) {
				                    $.getScript("easy_xdm/json2.js");
                        }
				                var xhr = new easyXDM.Rpc({ remote: "easy_xdm/cors/index.html" },
                                                  { remote: { request: {} } });
				                var success = function(response){
                            var status = response.status;
                            var statusText = response.data;
                            var responses;
                            if (options.dataType === "json") {
                                responses = { "json": $.parseJSON(statusText) };
                            }
                            var headers = response.headers;
                            completeCallback(status, statusText, responses, headers);
				                };
				                var error = function(e){
                            var status = e.status;
                            var statusText = e.data;
                            var responses;
                            if (options.dataType === "json") {
                                responses = { "json": $.parseJSON(statusText) };
                            }
                            var headers = null;
                            completeCallback(status, statusText, responses, headers);
				                };
				                xhr.request({
				                    url      : options.url,
				                    method   : options.type,
				                    data     : options.data,
				                }, success, error);
			              });
                },

                abort: function() {}
            };

        }
    });

})(jQuery);
