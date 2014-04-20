goog.provide('feng.views.sections.controls.Compass');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('feng.events');
goog.require('feng.views.sections.controls.Controls');


/**
 * @constructor
 */
feng.views.sections.controls.Compass = function(domElement, eventMediator){
	
  goog.base(this, domElement);

  this._directionsDom = goog.dom.query('.directions', this.domElement)[0];
  this._directionDoms = goog.dom.getChildren(this._directionsDom);

  this._isDragging = false;
  this._hasDragged = false;

  this._startDragAngle = 0;
  this._startAngle = 0;
  this._endAngle = this._startAngle;
  this._currentAngle = this._startAngle;

  this._center = this.getCenter();

  this._eventMediator = eventMediator;
};
goog.inherits(feng.views.sections.controls.Compass, feng.views.sections.controls.Controls);


feng.views.sections.controls.Compass.prototype.activate = function(){

	goog.base(this, 'activate');

  this._eventHandler.listen(this.domElement, 'mousedown', this.onMouseDown, false, this);
  this._eventHandler.listen(this._eventMediator.getEventTarget(), feng.events.EventType.UPDATE, this.onMediatorEvent, false, this);

  this._eventMediator.listen(this, feng.events.EventType.UPDATE);
};


feng.views.sections.controls.Compass.prototype.deactivate = function(){

  goog.base(this, 'deactivate');

  this._eventMediator.unlisten(this, feng.events.EventType.UPDATE);
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


feng.views.sections.controls.Compass.prototype.render = function(angle){

	goog.style.setStyle(this._directionsDom, 'transform', 'rotate(' + angle + 'deg)');

	goog.array.forEach(this._directionDoms, function(dom) {
		goog.style.setStyle(dom, 'transform', 'rotate(' + -angle + 'deg)');
	}, this);
};


feng.views.sections.controls.Compass.prototype.onMouseDown = function(e){

	this._isDragging = true;
	this._hasDragged = false;

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

	this._hasDragged = true;

	var dragAngleDiff = this.getDraggedAngle(e.clientX, e.clientY) - this._startDragAngle;
	this._endAngle = this._startAngle + dragAngleDiff;
};


feng.views.sections.controls.Compass.prototype.onMouseUp = function(e){

	this._isDragging = false;

	this._eventHandler.unlisten(document, 'mousemove', this.onMouseMove, false, this);
	this._eventHandler.unlisten(document, 'mouseup', this.onMouseUp, false, this);

	goog.dom.classes.remove(this.domElement, 'grabbing');
	goog.dom.classes.remove(document.body, 'grabbing');

	if(!this._hasDragged) {
		var angle;

		if(goog.dom.classes.has(e.target, 'n')) {

			angle = 0;
		}else if(goog.dom.classes.has(e.target, 's')) {

			angle = 180;
		}else if(goog.dom.classes.has(e.target, 'w')) {

			angle = 90;
		}else if(goog.dom.classes.has(e.target, 'e')) {

			angle = -90;
		}

		if(goog.isNumber(angle)) {
			this._endAngle = angle;

			this.dispatchEvent({
				type: feng.events.EventType.UPDATE,
				angle: this._endAngle
			});
		}
	}
};


feng.views.sections.controls.Compass.prototype.onAnimationFrame = function(now){

	var angleDiff = goog.math.angleDifference(this._currentAngle, this._endAngle);

	this._currentAngle += angleDiff * .25;

	this.dispatchEvent({
		type: feng.events.EventType.UPDATE,
		angle: this._currentAngle
	});

	var hasReachedEnd = (Math.abs(angleDiff) < 1);

	if(!this._isDragging && hasReachedEnd) {
		goog.fx.anim.unregisterAnimation(this);
	}
};


feng.views.sections.controls.Compass.prototype.onResize = function(e){

	this._center = this.getCenter();
};


feng.views.sections.controls.Compass.prototype.onMediatorEvent = function(e){

	switch(e.type) {
		case feng.events.EventType.UPDATE:

		if(e.target instanceof feng.controllers.controls.BrowseControls) {
			var deg = goog.math.toDegrees( e.rotationY );
			this.render( deg );
		}

		if(e.target instanceof feng.controllers.controls.DesignControls) {
			var deg = goog.math.toDegrees( e.rotationY );
			this.render( deg );
		}

		break;

		default:
		break;
	}
};