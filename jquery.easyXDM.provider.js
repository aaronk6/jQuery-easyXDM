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
  if (/jquery\.easyXDM\.debug=true/.test(String(window.location))) {
    easyXDM_debug = true;
  }
  var easyXDM_url = "/easyXDM/easyXDM.min.js";
  if (easyXDM_debug) {
    easyXDM_url = "/easyXDM/easyXDM.debug.js"
  }
  function continue_after_easyXDM_load() {
    // Use the scoped easyXDM available as a unique global name in the "parent",
    // and must match the noConflict name in parent.
    var scoped_easyXDM = easyXDM.noConflict("jquery_easyXDM");
    // instantiate a new easyXDM object which will handle the request
    var remote = new scoped_easyXDM.Rpc(
      {
        local:"name.html",
        swf:"/easyXDM/easyxdm.swf"
        // The provider is "passive", so no need to define an onReady handler
      }, {
      local:{
        // define the exposed method
        jquery_proxy:function (config, continuation_proxy) {
          // By definition easyXDM is used when crossDomain is not supported,
          // and easyXDM transforms the crossDomain request into a regular request
          // inside an embedded iframe.
          // This request is now inside the embedded iframe, and is therefore
          // by definition no longer a crossDomain request.
          config.crossDomain = false;
          $.ajax(config).done(function (data, textStatus, jqXHR) {
              var result = {
                status    :jqXHR.status,
                statusText:jqXHR.statusText,
                responses :{},
                headers   :jqXHR.getAllResponseHeaders()
              };
              if (jqXHR.responseText) {
                result.responses.text = jqXHR.responseText;
              }
              if (jqXHR.responseXml) {
                result.responses.xml = jqXHR.responseXml;
              }
              continuation_proxy(result);
          }).fail(function(jqXHR, textStatus, errorMessage) {
              var result = {
                status    :jqXHR.status,
                statusText:jqXHR.statusText,
                responses :{},
                headers   :jqXHR.getAllResponseHeaders()
              };
              if (jqXHR.responseText) {
                result.responses.text = jqXHR.responseText;
              }
              if (jqXHR.responseXml) {
                result.responses.xml = jqXHR.responseXml;
              }
              continuation_proxy(result);
          });
        }
      }
    });
  }
  $.getScript(easyXDM_url,function () {
    if (!(typeof(window["JSON"]) == 'object' && window["JSON"])) {
      $.getScript("/easyXDM/json2.js", continue_after_easyXDM_load);
    } else {
      continue_after_easyXDM_load();
    }
  });
})(jQuery);
