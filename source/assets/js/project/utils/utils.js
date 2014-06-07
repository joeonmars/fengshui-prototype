goog.provide('feng.utils.Utils');

goog.require('goog.style');


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