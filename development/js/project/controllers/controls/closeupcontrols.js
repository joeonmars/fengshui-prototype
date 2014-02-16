goog.provide('fengshui.controllers.controls.CloseUpControls');

goog.require('goog.events');
goog.require('goog.math');
goog.require('fengshui.controllers.controls.Controls');
goog.require('fengshui.utils.Randomizer');
goog.require('fengshui.utils.MultiLinearInterpolator');

/**
 * @constructor
 */
fengshui.controllers.controls.CloseUpControls = function(camera, domElement, view3d){

  goog.base(this, camera, domElement, view3d);

	this._targetRotationX = 0;
	this._targetRotationY = 0;

	this._maxRotationX = goog.math.toRadians(45);
	this._minRotationX = goog.math.toRadians(-45);

	this._projector = new THREE.Projector();

	var randomXNumbers = fengshui.utils.Randomizer.getRandomNumbers(6, 10, true);
	goog.array.forEach(randomXNumbers, function(number, index) {
		if(index % 2 === 0) randomXNumbers[index] *= -1;
	});

	var randomYNumbers = fengshui.utils.Randomizer.getRandomNumbers(1, 10, true);
	goog.array.forEach(randomYNumbers, function(number, index) {
		if(index % 2 === 0) randomYNumbers[index] *= -1;
	});

	this._randomXInterpolator = new fengshui.utils.MultiLinearInterpolator(randomXNumbers, 8000);
	this._randomYInterpolator = new fengshui.utils.MultiLinearInterpolator(randomYNumbers, 10000);
};
goog.inherits(fengshui.controllers.controls.CloseUpControls, fengshui.controllers.controls.Controls);


fengshui.controllers.controls.CloseUpControls.prototype.update = function ( elapsed ) {

	if ( !this._isEnabled ) return;

	var PI_2 = Math.PI / 2;

	this._yawObject.rotation.y += (this._targetRotationY - this._yawObject.rotation.y) * .1;
	this._pitchObject.rotation.x += (this._targetRotationX - this._pitchObject.rotation.x) * .1;
	this._pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this._pitchObject.rotation.x ) );

	// random rotating motion
	this._randomXInterpolator.update( elapsed * 1000 );
	this._randomYInterpolator.update( elapsed * 1000 );

	var cameraRotateX = this._randomXInterpolator.getValue() * .04;
	var cameraRotateY = this._randomYInterpolator.getValue() * .04;
	this._camera.rotation.x = cameraRotateX;
	this._camera.rotation.y = cameraRotateY;
};


fengshui.controllers.controls.CloseUpControls.prototype.onClick = function ( e ) {

	goog.base(this, 'onClick', e);

	var viewSize = goog.style.getSize(this._domElement);
	var position = this.getObject().position;

	var vector = new THREE.Vector3( ( e.clientX / viewSize.width ) * 2 - 1, - ( e.clientY / viewSize.height ) * 2 + 1, 0.5 );
	this._projector.unprojectVector( vector, this._camera );

	var raycaster = new THREE.Raycaster( position, vector.sub( position ).normalize() );

	var intersects = raycaster.intersectObjects( this._clickableObjects );

	/*
	if ( intersects.length > 0 ) {

		console.log('clicked on ' + intersects[0].object.name);

		this.dispatchEvent({
			type: fengshui.events.EventType.CHANGE,
			mode: fengshui.views.View3D.Mode.PATH,
			position: intersects[0].point
		});
	}
	*/
};


fengshui.controllers.controls.CloseUpControls.prototype.onMouseDown = function ( e ) {

	goog.base(this, 'onMouseDown', e);

};


fengshui.controllers.controls.CloseUpControls.prototype.onMouseMove = function ( e ) {

	goog.base(this, 'onMouseMove', e);

};