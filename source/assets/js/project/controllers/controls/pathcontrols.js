goog.provide('feng.controllers.controls.PathControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('feng.controllers.controls.Controls');
goog.require('feng.fx.PathTrack');
goog.require('feng.utils.ThreeUtils');

/**
 * @constructor
 */
feng.controllers.controls.PathControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

	this._targetRotationY = 0;
	this._tweener = null;
	this._pathTrack = null;
};
goog.inherits(feng.controllers.controls.PathControls, feng.controllers.controls.Controls);


feng.controllers.controls.PathControls.prototype.setCamera = function( fromPosition, toPosition, intersectPosition ) {

	this.setPosition( fromPosition );
	
	var pathfinder = feng.controllers.view3d.PathfindingController.getInstance();

	var start = this.getPosition();
	var end = toPosition;
	var collidableBoxes = this._view3d.getCollidableBoxes();
	var coordinates = pathfinder.findPath( start, end, collidableBoxes, this._scene );

	if(!coordinates) {

		return false;

	}else {

		// calculate rotation looking at intersect
		var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt( fromPosition, intersectPosition, new THREE.Vector3(0, 1, 0) );
		var rotation = new THREE.Euler(0, 0, 0, 'YXZ').setFromQuaternion( quaternion );
		this.setPitch( rotation.x );

		//
		if(this._pathTrack) {
			this._scene.remove( this._pathTrack );
		}

		this._pathTrack = new feng.fx.PathTrack( coordinates, 40, 0 );
		this._scene.add( this._pathTrack );

		this.onPathProgress( {t: 0} );

		return true;

	}
};


feng.controllers.controls.PathControls.prototype.update = function () {

	goog.base(this, 'update');

	var elapsed = this._clock.getElapsedTime();
};


feng.controllers.controls.PathControls.prototype.start = function ( toPosition ) {

	var length = this._pathTrack.spline.getLength();
	var duration = Math.max(1, length / 80);

	var prop = {
    t: 0
  };

  this._tweener = TweenMax.to(prop, duration, {
    t: 1,
    ease: Linear.easeNone,
    onUpdate: this.onPathProgress,
    onUpdateParams: [prop],
    onUpdateScope: this,
    onComplete: this.onPathComplete,
    onCompleteScope: this
  });

  goog.fx.anim.registerAnimation(this);
};


feng.controllers.controls.PathControls.prototype.onPathProgress = function ( prop ) {

  var t = prop.t;
  var pathTrack = this._pathTrack;
  var pathCamera = pathTrack.getCameraAt(t);
  var cameraPosition = pathCamera.position;
  var cameraRotation = pathCamera.rotation;

  this.setPosition( cameraPosition.x, this.getPosition().y, cameraPosition.z );
  this.setRotation( this.getRotation().x, cameraRotation.y, cameraRotation.z );
};


feng.controllers.controls.PathControls.prototype.onPathComplete = function () {

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.views.View3D.Mode.BROWSE
	});
};