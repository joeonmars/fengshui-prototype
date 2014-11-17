goog.provide('feng.controllers.controls.EntryControls');

goog.require('feng.controllers.controls.Controls');
goog.require('feng.utils.ThreeUtils');


/**
 * @constructor
 * a series of movements before entering the door first-time
 */
feng.controllers.controls.EntryControls = function(camera, view3d, domElement){

  goog.base(this, camera, view3d, domElement);

  this._cameraPosition = new THREE.Vector3(0, 0, 0);
  this._cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');

  this._timeline = new TimelineMax();

  this._entry = this._view3d.getEntry();
};
goog.inherits(feng.controllers.controls.EntryControls, feng.controllers.controls.Controls);


feng.controllers.controls.EntryControls.prototype.start = function () {

	var entry = this._entry;
	var entryPosition = entry.getCenter();
	var entryOriginPosition = entry.origin.position;
	var entryOriginRotation = entry.origin.rotation;
	var entryDirection = (new THREE.Vector3()).subVectors(entryOriginPosition, entryPosition).setY(0).normalize().negate();

	var endPosition = entryOriginPosition.clone().setY( feng.controllers.controls.Controls.Default.STANCE_HEIGHT );
	var startPosition = entryPosition.clone().setY( feng.controllers.controls.Controls.Default.STANCE_HEIGHT ).add( entryDirection.clone().multiplyScalar(150) );
	var stepInPosition = startPosition.clone().add( entryDirection.clone().multiplyScalar(-80) );

	var endRotation = entryOriginRotation.clone();
	var startRotation = new THREE.Euler(0, 0, 0, 'YXZ');
	var quaternion = feng.utils.ThreeUtils.getQuaternionByLookAt(startPosition, entryPosition);
	startRotation.setFromQuaternion( quaternion );

	var endFov = feng.controllers.controls.Controls.Default.FOV;
	var startFov = endFov + 20;

	this.setPosition( startPosition );
	this.setRotation( startRotation );
	this.setFov( startFov );

	var designPlane = this._view3d.designPlane;
	designPlane.addToScene();

	var prop = {
		t: 0,
		startPosition: startPosition,
		endPosition: stepInPosition
	};

	var stepCloseTweener = TweenMax.to(prop, 3, {
		t: 1,
		'ease': Sine.easeInOut,
		'onUpdate': this.onStepCloseUpdate,
		'onUpdateParams': [prop],
		'onUpdateScope': this,
		'onComplete': this.onStepCloseComplete,
		'onCompleteScope': this
	});

	var prop = {
		t: 0,
		startPosition: stepInPosition,
		endPosition: endPosition,
		startRotation: startRotation,
		endRotation: endRotation,
		startFov: startFov,
		endFov: endFov
	};

	var arriveInTweener = TweenMax.to(prop, 3, {
		t: 1,
		'delay': 1,
		'ease': Quad.easeInOut,
		'onUpdate': this.onArriveInUpdate,
		'onUpdateParams': [prop],
		'onUpdateScope': this,
		'onComplete': this.onArriveInComplete,
		'onCompleteParams': [prop],
		'onCompleteScope': this
	});

	this._timeline.add( stepCloseTweener );
	this._timeline.add( arriveInTweener );
};


feng.controllers.controls.EntryControls.prototype.openDoor = function () {

	var skipPause = true;
	this._entry.open( skipPause );

	var designPlane = this._view3d.designPlane;
	designPlane.removeFromScene();

	this._timeline.play();
};


feng.controllers.controls.EntryControls.prototype.onStepCloseUpdate = function (prop) {

	var t = prop.t;
	var startPosition = prop.startPosition;
	var endPosition = prop.endPosition;

	var position = this._cameraPosition.copy( startPosition ).lerp( endPosition, t );
	this.setPosition( position );
};


feng.controllers.controls.EntryControls.prototype.onStepCloseComplete = function () {

	this._timeline.pause();

	var hud = this._view3d.hud;
	var viewId = this._view3d.id;
	var sectionId = this._view3d.sectionId;

	hud.openingOverlay.updateContent( sectionId, viewId );
	hud.openingOverlay.animateIn();

	goog.events.listenOnce( hud.openingOverlay, feng.events.EventType.HIDE, this.openDoor, false, this );
};


feng.controllers.controls.EntryControls.prototype.onArriveInUpdate = function (prop) {

	var t = prop.t;

	var startPosition = prop.startPosition;
	var endPosition = prop.endPosition;

	var position = this._cameraPosition.copy( startPosition ).lerp( endPosition, t );
	this.setPosition( position );

	var startRotation = prop.startRotation;
	var endRotation = prop.endRotation;

	var rx = goog.math.lerp(startRotation.x, endRotation.x, t);
	var ry = goog.math.lerp(startRotation.y, endRotation.y, t);
	var rz = goog.math.lerp(startRotation.z, endRotation.z, t);
	
	this._cameraRotation.set( rx, ry, rz, 'YXZ' );

	this.setRotation( this._cameraRotation );

	var startFov = prop.startFov;
	var endFov = prop.endFov;
	var fov = goog.math.lerp( startFov, endFov, t );

	this.setFov( fov );
};


feng.controllers.controls.EntryControls.prototype.onArriveInComplete = function (prop) {

	this._entry.close();

	this.dispatchEvent({
		type: feng.events.EventType.CHANGE,
		mode: feng.controllers.view3d.ModeController.Mode.BROWSE,
		toPosition: prop.endPosition,
		toRotation: prop.endRotation,
		toFov: prop.endFov
	});
};