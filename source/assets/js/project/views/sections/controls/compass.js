goog.provide('feng.views.sections.controls.Compass');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.events');


/**
 * @constructor
 */
feng.views.sections.controls.Compass = function(domElement){
  goog.base(this);

  this.domElement = domElement;

  this._directionsDom = goog.dom.query('.directions', this.domElement)[0];
  this._directionDoms = goog.dom.getChildren(this._directionsDom);

  this._isDragging = false;

  this._startDragAngle = 0;
  this._startAngle = 0;
  this._endAngle = this._startAngle;
  this._currentAngle = this._startAngle;

  this._center = this.getCenter();

  this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(feng.views.sections.controls.Compass, goog.events.EventTarget);


feng.views.sections.controls.Compass.prototype.activate = function(){

  this._eventHandler.listen(this.domElement, 'mousedown', this.onMouseDown, false, this);
  this._eventHandler.listen(this.domElement, 'click', this.onClick, false, this);
};


feng.views.sections.controls.Compass.prototype.deactivate = function(){

  this._eventHandler.removeAll();
};


feng.views.sections.controls.Compass.prototype.getCenter = function(){

	var center = {
		x: goog.style.getSize(this.domElement).width / 2 + goog.style.getPageOffsetLeft(this.domElement),
		y: goog.style.getSize(this.domElement).height / 2 + goog.style.getPageOffsetTop(this.domElement)
	};

	return center;
};


feng.views.sections.controls.Compass.prototype.getDraggedAngle = function(mouseX, mouseY){

	return goog.math.angle(mouseX, mouseY, this._center.x, this._center.y) - 90;
};


feng.views.sections.controls.Compass.prototype.onMouseDown = function(e){

	this._isDragging = true;

	this._eventHandler.listen(document, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.listen(document, 'mouseup', this.onMouseUp, false, this);

	goog.dom.classes.add(this.domElement, 'grabbing');
	goog.dom.classes.add(document.body, 'grabbing');

	this._startDragAngle = this.getDraggedAngle(e.clientX, e.clientY);
	this._startAngle = this._currentAngle;
	this._endAngle = this._currentAngle;

	goog.fx.anim.registerAnimation(this);
};


feng.views.sections.controls.Compass.prototype.onMouseMove = function(e){

	var dragAngleDiff = this.getDraggedAngle(e.clientX, e.clientY) - this._startDragAngle;
	this._endAngle = this._startAngle + dragAngleDiff;
};


feng.views.sections.controls.Compass.prototype.onMouseUp = function(e){

	this._isDragging = false;

	this._eventHandler.unlisten(document, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

	goog.dom.classes.remove(this.domElement, 'grabbing');
	goog.dom.classes.remove(document.body, 'grabbing');
};


feng.views.sections.controls.Compass.prototype.onClick = function(e){


};


feng.views.sections.controls.Compass.prototype.onAnimationFrame = function(now){

	var angleDiff = goog.math.angleDifference(this._currentAngle, this._endAngle);

	this._currentAngle += angleDiff * .25;
	goog.style.setStyle(this._directionsDom, 'transform', 'rotate(' + this._currentAngle + 'deg)');

	goog.array.forEach(this._directionDoms, function(dom) {
		goog.style.setStyle(dom, 'transform', 'rotate(' + -this._currentAngle + 'deg)');
	}, this);

	var hasReachedEnd = (Math.abs(angleDiff) < 1);

	if(!this._isDragging && hasReachedEnd) {
		goog.fx.anim.unregisterAnimation(this);
	}
};


feng.views.sections.controls.Compass.prototype.onResize = function(e){

	this._center = this.getCenter();
};