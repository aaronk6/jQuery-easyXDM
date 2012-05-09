var jquery_easyXDM = {};
(function($) {
  // Used pattern from http://backtothefront.net/2012/asynchronous-singleton-api/
  // for thread safe single instance easyXDM instatiation.
  var state = "before";
  var callbackQueue = [];
  var easyXDM_connection = null;
  var error = null;
  var doRequests = function(callbacks) {
      if(!$.support.cors) {
        // Allow debugging of easyXDM by adding easyXDM_debug=true as parameter to the page that uses this plugin.
        var easyXDM_debug = false;
        if(/jquery\.easyXDM\.debug=true/.test(window.location)){ easyXDM_debug = true; };
        var easyXDM_url = "/easyXDM/easyXDM.min.js";
        if(easyXDM_debug) { easyXDM_url = "/easyXDM/easyXDM.debug.js" };
        // TODO: Replace with jQuery.cachedScript from http://api.jquery.com/jQuery.getScript/
        $.getScript(easyXDM_url, function() {
          //var scoped_easyXDM = easyXDM.noConflict("jquery_easyXDM");
          //window.jquery_easyXDM.easyXDM = scoped_easyXDM;
          var remote_url = "/javascripts/jquery.easyXDM.provider.html";
          if(easyXDM_debug) { remote_url += "?jquery.easyXDM.debug=true" };
          easyXDM_connection = new easyXDM.Rpc({ remote: remote_url }, { remote: { jquery_proxy: {} } });
          callbacks.success(easyXDM_connection);
        });
      };
    };

  jquery_easyXDM.getConnection = function(callbacks) {
    switch (state) {
      case "before":
        state = "working";
        callbackQueue.push(callbacks);
        doRequests({
          success : function(singletonInstance) {
            state = "success";
            easyXDM_connection = singletonInstance;
            for (var i = 0, ilen = callbackQueue.length; i < ilen; i++) {
              callbackQueue[i].success(easyXDM_connection);
            }
            callbackQueue = [];
          },
          failure : function(errorObj) {
            state = "failure";
            error = errorObj;
            for (var i = 0, ilen = callbackQueue.length; i < ilen; i++) {
              callbackQueue[i].failure(error);
            }
            callbackQueue = [];
          }
        });
        break;
      case "working":
        callbackQueue.push(callbacks);
        break;
      case "success":
        callbacks.success(easyXDM_connection);
        break;
      case "failure":
        callbacks.failure(error);
        break;
      default:
        throw new Error("Invalid state: " + state)
    }
  };

  jQuery.ajaxTransport(function(options, originalOptions, jqXHR) {
    if(!$.support.cors && options.crossDomain) {
      return {
        send: function( headers, completeCallback ) {
          jquery_easyXDM.getConnection({
            success: function(easyXDM_connection){
              function continuation_proxy(results){
                completeCallback(results.status, results.statusText, results.responses, results.headers);
              };
              easyXDM_connection.jquery_proxy(options,continuation_proxy);
            },
            failure : function(){ }
          });
        },
          abort: function() {}
      };
    }
  });
})(jQuery);
