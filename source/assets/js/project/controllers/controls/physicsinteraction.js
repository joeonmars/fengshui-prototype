goog.provide('feng.controllers.controls.PhysicsInteraction');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('feng.controllers.controls.Physics');


/**
 * @constructor
 */
feng.controllers.controls.PhysicsInteraction = function( startFunc, endFunc ){

	goog.base(this);

	this._startFunc = startFunc;
	this._endFunc = endFunc;

  this._physics = null;
  this._object = null;
  this._rotateTweener = null;
  this._plane = new THREE.Plane( new THREE.Vector3(0,1,0) );
  this._projector = new THREE.Projector();
  this._eventHandler = new goog.events.EventHandler( this );

  // collection of physics worlds of unique id
  this._physics = {};
};
goog.inherits(feng.controllers.controls.PhysicsInteraction, goog.events.EventTarget);


feng.controllers.controls.PhysicsInteraction.prototype.setPhysicsWorld = function( id, width, height ){

  var physics = this._physics[id] || new feng.controllers.controls.Physics( width, height );

  this._physics[id] = physics;

  return physics;
};


feng.controllers.controls.PhysicsInteraction.prototype.syncPhysics = function(){

	var object3d = this._object.object3d;

	// update position
	var threePosition = this._physics.getActiveBox3DPosition();
	threePosition.y = object3d.position.y;

	object3d.position.set(threePosition.x, threePosition.y, threePosition.z);

	// update rotation
	var rotation = this._physics.getActiveBoxRotation();

	object3d.rotation.y = rotation;
};


feng.controllers.controls.PhysicsInteraction.prototype.move = function( object, collidableBoxes, objectBox ){

	this._object = object;

	this._physics.startMove( collidableBoxes, objectBox );

	this._eventHandler.listen(window, 'mousemove', this.onMoveUpdate, false, this);
	this._eventHandler.listen(window, 'click', this.onMoveEnd, false, this);

	this.onMoveUpdate(e);

	this._startFunc();
};


feng.controllers.controls.PhysicsInteraction.prototype.rotate = function( object, collidableBoxes, objectBox ){

	this._object = object;
	var object3d = this._object.object3d;

	if(this._rotateTweener && this._rotateTweener.isActive()) return;

	// prevent rotating during physics running
	if(this._physics.isRunning) return;

	this._physics.startRotate( collidableBoxes, objectBox );

	// rotate object around it's own Y axis
	var prop = {
		rad: object3d.rotation.y
	};

	this._rotateTweener = TweenMax.to(prop, .2, {
		rad: prop.rad + Math.PI / 2,
		onUpdate: this.onRotateUpdate,
		onUpdateParams: [prop],
		onUpdateScope: this,
		onComplete: this.onRotateEnd,
		onCompleteScope: this
	});

	this._startFunc();
};


feng.controllers.controls.PhysicsInteraction.prototype.onMoveUpdate = function ( e ) {

	var mousePos = new THREE.Vector3();
	mousePos.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mousePos.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

  var ray = this._projector.pickingRay( mousePos, this._camera ).ray;
	var intersect = ray.intersectPlane( this._plane );

	this._physics.updateActiveBox( intersect.x, intersect.z );

	this.syncPhysics();
};


feng.controllers.controls.PhysicsInteraction.prototype.onMoveEnd = function ( e ) {

	this._eventHandler.unlisten(window, 'mousemove', this.onMoveUpdate, false, this);
	this._eventHandler.unlisten(window, 'click', this.onMoveEnd, false, this);

	this._physics.stop();

	this._endFunc();
};


feng.controllers.controls.PhysicsInteraction.prototype.onRotateUpdate = function ( prop ) {

	this._physics.updateActiveBox( null, null, prop.rad );
};


feng.controllers.controls.PhysicsInteraction.prototype.onRotateEnd = function ( prop ) {

	this._physics.stop();
	this.syncPhysics();

	this._endFunc();
};