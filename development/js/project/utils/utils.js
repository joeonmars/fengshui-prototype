goog.provide('fengshui.utils.Utils');



/**
 * @constructor
 */
fengshui.utils.Utils.setValueByKeys = function(key, val, obj) {
	
  if (!obj) obj = data;
  var ka = key.split(/\./);
  if (ka.length < 2) { 
    obj[ka[0]] = val;
  } else {
    if (!obj[ka[0]]) obj[ka[0]] = {};
    obj = obj[ka.shift()];
    fengshui.utils.Utils.setValueByKeys(ka.join("."),val,obj);
  }    
};