goog.provide('feng.views.sections.controls.ProgressBar');

goog.require('goog.events');
goog.require('feng.models.achievements.Achievements');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.ProgressBar = function(domElement){

  goog.base(this, domElement);

  this._innerEl = goog.dom.query('.inner', this.domElement)[0];
  this._tipEls = goog.dom.query('.tips > li', this.domElement);

  // fetch tip models
  this._tips = {};
  
  var achievements = feng.models.achievements.Achievements.getInstance();

  goog.array.forEach(this._tipEls, function(tipEl) {

		var tipId = tipEl.getAttribute('data-tip-id');
		var viewId = tipEl.getAttribute('data-view-id');
		var sectionId = tipEl.getAttribute('data-section-id');
		
		this._tips[ tipId ] = achievements.getTip(tipId, viewId, sectionId);
  }, this);

  // svg
  this._svgSize = goog.style.getSize(this._innerEl);
  this._snap = Snap(this._svgSize.width, this._svgSize.height);
  goog.dom.appendChild( this._innerEl, this._snap.node );

  this._circleGroup = this._snap.group();
  this._circles = [];
  this._circleRadius = 4;
  this._totalTips = this._tipEls.length;
  this._totalSections = this._totalTips + 1;
  this._totalCircles = 60;
  this._circlesOfSection = Math.floor( this._totalCircles / this._totalSections );

  this._circlePositions = [];
  this._affectedValues = [];
  this._easedAffectedValues = [];
  this._yFactor = 1;

  this._circleOffset = new goog.math.Coordinate(0, 0);
  this._localMouse = new goog.math.Coordinate(0, 0);
  this._mouseLeft = 0;
  this._mouseRight = 0;
  this._mouseTop = 0;

  this._startTime = null;

  // create circles
  var c = 0;
  var t = Math.PI / this._totalCircles;
  var i;

  for( i = 0; i < this._totalCircles; i ++ ) {
    var circle = this._snap.circle(0, 0, this._circleRadius);
    this._circleGroup.add( circle );
    this._circles.push( circle );

    var opacity = Math.sin( c );
    c += t;

    circle.attr({
      'fill-opacity': opacity
    });
  }
};
goog.inherits(feng.views.sections.controls.ProgressBar, feng.views.sections.controls.Controls);


feng.views.sections.controls.ProgressBar.prototype.activate = function(){

	goog.base(this, 'activate');

	goog.array.forEach(this._tipEls, function(tipEl) {
		this._eventHandler.listen(tipEl, 'click', this.onClickTip, false, this);
	}, this);

	this._eventHandler.listen(this._innerEl, 'mouseover', this.onMouseOver, false, this );
  this._eventHandler.listen(this._innerEl, 'mouseout', this.onMouseOut, false, this );
};


feng.views.sections.controls.ProgressBar.prototype.show = function(){

	goog.base(this, 'show');

	this.reset();

	this._startTime = goog.now();
	goog.fx.anim.registerAnimation(this);

  this.hide();
};


feng.views.sections.controls.ProgressBar.prototype.hide = function(){

	goog.base(this, 'hide');

	goog.fx.anim.unregisterAnimation(this);
};


feng.views.sections.controls.ProgressBar.prototype.reset = function() {

  for( var i = 0; i < this._totalCircles; i ++ ) {

    var circle = this._circles[ i ];

    this._affectedValues[i] = 0;
    this._easedAffectedValues[i] = 0;
  }

  this._yFactor = 0;

  this._circleGroup.attr({
    'opacity': .5
  });
};


feng.views.sections.controls.ProgressBar.prototype.drawCircles = function( counter ) {

  var counter = counter || 0;
  var increase = Math.PI * this._totalSections / this._totalCircles;
  var step = 1 / this._totalCircles;
  var i;
  
  for( i = 0; i <= 1; i += step ) {

    var circleIndex = Math.round( this._totalCircles * i );
    var circle = this._circles[ circleIndex ];

    var delta = Math.sin(counter) / 2 + .5;
    var n = Math.abs( noise.perlin2(i, 0) );
    var affected = this._easedAffectedValues[ circleIndex ];

    var x = i * this._svgSize.width;
    var y = delta * this._svgSize.height * n;
    y += (this._localMouse.y - y) * affected;

    y *= this._yFactor;

    counter += increase;

    circle.attr({
      'cx': x.toFixed(2),
      'cy': y.toFixed(2)
    });
  }

  // ease affected
  for( i = 0; i < this._totalCircles; i ++ ) {
    this._easedAffectedValues[i] += (this._affectedValues[i] - this._easedAffectedValues[i]) * .05;
  }

  // align to center
  var box = this._circleGroup.node.getBoundingClientRect();
  var mat = new Snap.Matrix();
  this._circleOffset.x = (this._svgSize.width - box.width)/2 + this._circleRadius;
  this._circleOffset.y = (this._svgSize.height - box.height)/2 + this._circleRadius;
  mat.translate( this._circleOffset.x, this._circleOffset.y );
  this._circleGroup.transform( mat );

  // store points global position
  this._circlePositions = [];

  for( i = 1; i < this._totalSections; i ++ ) {
    var circle = this._circles[ i * this._circlesOfSection ];
    var x = parseFloat(circle.attr('cx')) + this._circleOffset.x;
    var y = parseFloat(circle.attr('cy')) + this._circleOffset.y;

    this._circlePositions.push({
    	x: x,
    	y: y
    });
  }

  // sync tip dom position
  goog.array.forEach(this._tipEls, function(tipEl, index) {
		var circlePositon = this._circlePositions[ index ];
		goog.style.setStyle(tipEl, 'transform', 'translate(' + circlePositon.x + 'px,' + circlePositon.y + 'px)');
  }, this);
};


feng.views.sections.controls.ProgressBar.prototype.getAffectedByMouse = function(x, y){

	if(x < this._mouseLeft || x > this._mouseRight) {
	  return 0;
	}

	var d = this._mouseRight - this._mouseLeft;
	var px = (x - this._mouseLeft) / d;

	var py = this._mouseTop / this._svgSize.height;

	var affected = Math.sin( Math.PI * px ) * Math.sin( Math.PI * py );
	return affected;
};


feng.views.sections.controls.ProgressBar.prototype.onClickTip = function(e){

	var tipId = e.currentTarget.getAttribute('data-tip-id');
	var tip = this._tips[tipId];
	
	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		tip: tip
	});
};


feng.views.sections.controls.ProgressBar.prototype.onMouseOver = function(e){

	if( e.relatedTarget && goog.dom.contains( this.domElement, e.relatedTarget ) ) return false;

  TweenMax.to(this, 1, {
    _yFactor: 1,
    ease: Quad.easeOut
  });

  var prop = {
    val: this._circleGroup.attr('opacity')
  };

  TweenMax.to(prop, 1, {
    val: 1,
    onUpdate: function() {
      this._circleGroup.attr({
        'opacity': prop.val
      });
    },
    onUpdateScope: this
  });
};


feng.views.sections.controls.ProgressBar.prototype.onMouseOut = function(e){

	if( e.relatedTarget && goog.dom.contains( this.domElement, e.relatedTarget ) ) return false;

  for( var i = 0; i < this._totalCircles; i ++ ) {
    this._affectedValues[i] = 0;
  }

  TweenMax.to(this, 4, {
    _yFactor: 0,
    ease: Expo.easeInOut
  });

  var prop = {
    val: this._circleGroup.attr('opacity')
  };

  TweenMax.to(prop, 1, {
    val: .5,
    onUpdate: function() {
      this._circleGroup.attr({
        'opacity': prop.val
      });
    },
    onUpdateScope: this
  });
};


feng.views.sections.controls.ProgressBar.prototype.onMediatorEvent = function(e){

	switch(e.type) {
		case feng.events.EventType.PROGRESS:
		break;
	};
};


feng.views.sections.controls.ProgressBar.prototype.onAnimationFrame = function(now){

  this.drawCircles( (now - this._startTime) / 1000 );
};


feng.views.sections.controls.ProgressBar.prototype.onResize = function(e){

	goog.base(this, 'onResize', e);

	var mainSize = goog.style.getSize( goog.dom.getElement('main') );

	goog.style.setStyle(this.domElement, 'top', mainSize.height - this._svgSize.height - 60 + 'px');
};