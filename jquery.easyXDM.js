/*
 * https://github.com/GyldendalDigital/jQuery-EasyXDM
 */

var jquery_easyXDM = {};
(function ($) {
  // Used pattern from http://backtothefront.net/2012/asynchronous-singleton-api/
  // for thread safe single instance easyXDM instantiation.
  var state = "before";
  var callbackQueue = [];
  var easyXDM_connection = null;
  var error = null;
  var doRequests = function (callbacks) {
    if (!$.support.cors) {
      // Allow debugging of easyXDM by adding easyXDM_debug=true as parameter
      // to the page that uses this plugin.
      var easyXDM_debug = false;
      if (/jquery\.easyXDM\.debug=true/.test(String(window.location))) {
        easyXDM_debug = true;
      }
      var easyXDM_url = "/easyXDM/easyXDM.min.js";
      if (easyXDM_debug) {
        easyXDM_url = "/easyXDM/easyXDM.debug.js"
      }
      function continue_after_easyXDM_load() {
        // Use noConflict to release any global state, to avoid conflict with
        // other easyXDM instances in the window of this page.
        var scoped_easyXDM = easyXDM.noConflict("jquery_easyXDM");
        // Make the scoped easyXDM available as a unique global name, that can
        // be found from the easyXDM provider, and must match the noConflict
        // name in the provider.
        jquery_easyXDM.easyXDM = scoped_easyXDM;
        var remote_url = "/javascripts/jquery.easyXDM.provider.html";
        if (easyXDM_debug) {
          remote_url += "?jquery.easyXDM.debug=true"
        }
        easyXDM_connection = new scoped_easyXDM.Rpc({ remote:remote_url }, { remote:{ jquery_proxy:{} } });
        callbacks.success(easyXDM_connection);
      }

      $.getScript(easyXDM_url, function () {
        // Load a json implementation if needed by old browsers
        // Avoid easyXDM helper that returns before the script is loaded.
        if (!(typeof(window["JSON"]) == 'object' && window["JSON"])) {
          $.getScript("/easyXDM/json2.js", continue_after_easyXDM_load);
        } else {
          continue_after_easyXDM_load();
        }
      });
    }
  };

  jquery_easyXDM.getConnection = function (callbacks) {
    switch (state) {
      case "before":
        state = "working";
        callbackQueue.push(callbacks);
        doRequests({
          success:function (singletonInstance) {
            state = "success";
            easyXDM_connection = singletonInstance;
            for (var i = 0; i < callbackQueue.length; i++) {
              callbackQueue[i].success(easyXDM_connection);
            }
            callbackQueue = [];
          },
          failure:function (errorObj) {
            state = "failure";
            error = errorObj;
            for (var i = 0; i < callbackQueue.length; i++) {
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

  jQuery.ajaxTransport(function (options, originalOptions, jqXHR) {
    if (!$.support.cors && options.crossDomain) {
      return {
        send :function (headers, completeCallback) {
          jquery_easyXDM.getConnection({
            success:function (easyXDM_connection) {
              function continuation_proxy(results) {
                completeCallback(results.status, results.statusText, results.responses, results.headers);
              }
              easyXDM_connection.jquery_proxy(originalOptions, continuation_proxy);
            },
            failure:function () {
              // Unable to get easyXDM connection
            }
          });
        },
        abort:function () {
        }
      };
    }
  });
})(jQuery);
