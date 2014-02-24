goog.provide('feng.utils.ThreeUtils');

goog.require('goog.math');


/**
 * @constructor
 */
feng.utils.ThreeUtils.getObjectsBy2DPosition = function ( clientX, clientY, objects, camera, domElement ) {

	var viewSize = goog.style.getSize(domElement);

	// get camera's world position
	camera.updateMatrixWorld();
	var position = camera.position.clone();
	position.applyMatrix4( camera.matrixWorld );

	var vector = new THREE.Vector3( ( clientX / viewSize.width ) * 2 - 1, - ( clientY / viewSize.height ) * 2 + 1, 0.5 );
	
	var projector = new THREE.Projector();
	projector.unprojectVector( vector, camera );

	var raycaster = new THREE.Raycaster( position, vector.sub( position ).normalize() );

	var intersects = raycaster.intersectObjects( objects );

	return intersects;
};