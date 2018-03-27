
// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('X-Parse-Application-Id', '676a1e781a66c09718a32a0221ea3a23a9080272');
  jqXHR.setRequestHeader('X-Parse-REST-API-Key', '848f43ff2d1f6d372a9779c6be185d11f18cc183');
});