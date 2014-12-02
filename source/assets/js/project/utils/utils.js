goog.provide('feng.utils.Utils');

goog.require('goog.dom');
goog.require('goog.string');
goog.require('goog.style');
goog.require('goog.Uri');
goog.require('goog.window');


/**
 * @constructor
 */
feng.utils.Utils.setValueByKeys = function(key, val, obj) {
	
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


feng.utils.Utils.centerAlign = function(alignEl, relativeElOrSize) {

  var relativeSize = (relativeElOrSize.width && relativeElOrSize.height) ? relativeElOrSize : null;

  if(!relativeSize) {
    relativeSize = goog.style.getSize( relativeElOrSize );
  }

  var alignElSize = goog.style.getSize( alignEl );
  var alignElX = Math.round( (relativeSize.width - alignElSize.width) / 2 );
  var alignElY = Math.round( (relativeSize.height - alignElSize.height) / 2 );

  goog.style.setPosition( alignEl, alignElX, alignElY );
};


feng.utils.Utils.createDomCollectionByAttributes = function( doms, attr ) {

  var result = {};

  goog.array.forEach(doms, function(dom) {
    result[ dom.getAttribute( attr ) ] = dom;
  });

  return result;
};


feng.utils.Utils.popUp = function(url) {

  var width, height;

  var isFacebook = goog.string.contains( url, 'facebook' );
  var isTwitter = goog.string.contains( url, 'twitter' );
  var isGoogle = goog.string.contains( url, 'google' );

  if(isFacebook) {

    width = 640;
    height = 275;

  }else if(isTwitter) {

    width = 575;
    height = 275;

  }else if(isGoogle) {

    width = 640;
    height = 470;
  }

  var viewportSize = goog.dom.getViewportSize();

  goog.window.open(url, {
    'width': width,
    'height': height,
    'left': (window.screenLeft || window.screenX) + (viewportSize.width - width)/2,
    'top': (window.screenTop || window.screenY) + (viewportSize.height - height)/2,
    'toolbar': false,
    'scrollbars': true,
    'statusbar': false,
    'menubar': false,
    'resizable': true
  });
};


feng.utils.Utils.supportWebGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && canvas.getContext( 'webgl' ); } catch( e ) { return false; } } )();