goog.provide('feng.fx.Shaders');

goog.require('goog.dom.query');
goog.require('goog.net.XhrIo');


feng.fx.Shaders = function() {

	this.shaderEls = null;

	var shadersUrl = feng.Config['assetsPath'] + 'html/shaders.html';

	var onComplete = goog.bind( this.onComplete, this );

	goog.net.XhrIo.send( shadersUrl, onComplete );
};
goog.addSingletonGetter(feng.fx.Shaders);


feng.fx.Shaders.prototype.getShader = function( id ) {

  var shadersData = goog.array.find(this.shaderEls, function(el) {
  	return el.id === id;
  });

  return shadersData.textContent;
};


feng.fx.Shaders.prototype.onComplete = function( e ) {

	if( e.target.isSuccess() ) {

		var dom = goog.dom.createDom('div');
		dom.innerHTML = e.target.getResponseText();

		var shaderEls = goog.dom.getChildren( dom );

		this.shaderEls = goog.array.map(shaderEls, function(el) {
			return el;
		});

		//console.log( 'shaders load complete', this.shaderEls );

	}else {

		// handling load errors

	}
};