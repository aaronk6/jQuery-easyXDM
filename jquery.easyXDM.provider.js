/*
 * https://github.com/GyldendalDigital/jQuery-EasyXDM
 *
 * This is a CORS (Cross-Origin Resource Sharing) and AJAX enabled endpoint
 * for jQuery-EasyXDM plugin.
 * It proxys jquery.easyXDM requests with an easyXDM provider.
 *
 */
(function ($) {
  // Load correct version of easyXDM
  var easyXDM_debug = false;
  if (/jquery\.easyXDM\.debug=true/.test(window.location)) {
    easyXDM_debug = true;
  };
  var easyXDM_url = "/easyXDM/easyXDM.min.js";
  if (easyXDM_debug) {
    easyXDM_url = "/easyXDM/easyXDM.debug.js"
  };
  $.getScript(easyXDM_url).done(function () {
    // Use the scoped easyXDM available as a unique global name in the "parent",
    // and must match the noConflict name in parent.
    var scoped_easyXDM = easyXDM.noConflict("jquery_easyXDM");
    // instantiate a new easyXDM object which will handle the request
    var remote = new scoped_easyXDM.Rpc({ local:"name.html", swf:"easyxdm.swf"}, {
      local:{
        // define the exposed method
        jquery_proxy:function (config, continuation_proxy) {
          $.ajax(config).done(
            function (data, textStatus, jqXHR) {
              var result = {
                status    :jqXHR.status,
                statusText:jqXHR.statusText,
                responses :{},
                headers   :jqXHR.getAllResponseHeaders()
              };
              if (jqXHR.responseText) {
                result.responses.text = jqXHR.responseText
              }
              if (jqXHR.responseXml) {
                result.responses.xml = jqXHR.responseXml
              }
              continuation_proxy(result);
            }).fail(function (jqXHR, textStatus, errorMessage) {
              var result = {
                status    :jqXHR.status,
                statusText:jqXHR.statusText,
                responses :{},
                headers   :jqXHR.getAllResponseHeaders()
              };
              if (jqXHR.responseText) {
                result.responses.text = jqXHR.responseText
              }
              if (jqXHR.responseXml) {
                result.responses.xml = jqXHR.responseXml
              }
              continuation_proxy(result);
            });
        }
      }
    });
  });
})(jQuery);
