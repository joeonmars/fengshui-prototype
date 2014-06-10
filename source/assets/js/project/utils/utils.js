goog.provide('feng.utils.Utils');

goog.require('goog.style');
goog.require('goog.Uri');


/**
 * @constructor
 */
feng.utils.Utils.setValueByKeys = function(key, val, obj) {
	
  if (!obj) obj = data;
  var ka = key.split(/\./);
  if (ka.length < 2) { 
    obj[ka[0]] = val;
  } else {
    if (!obj[ka[0]]) obj[ka[0]] = {};
    obj = obj[ka.shift()];
    feng.utils.Utils.setValueByKeys(ka.join("."),val,obj);
  }    
};


feng.utils.Utils.setCursor = function(cursor, element) {

  var el = element || document.body;
  goog.style.setStyle(el, 'cursor', cursor);
};


feng.utils.Utils.getQuery = function(key) {

  var uri = new goog.Uri( window.location.href );
  var queryData = uri.getQueryData();

  return queryData.get(key);
};


feng.utils.Utils.hasQuery = function(key, value) {

  var uri = new goog.Uri( window.location.href );
  var queryData = uri.getQueryData();

  return (goog.isString(value) ? (queryData.get(key) === value) : queryData.hasQuery(key));
};