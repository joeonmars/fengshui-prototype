goog.provide('feng.utils.ThreeUtils');

goog.require('goog.math');


/**
 * @constructor
 */
feng.utils.ThreeUtils.getObjectsBy2DPosition = function( clientX, clientY, objects, camera, viewSize, recursive ) {

	// get camera's world position
	camera.updateMatrixWorld();
	var position = camera.position.clone();
	position.applyMatrix4( camera.matrixWorld );

	var vector = new THREE.Vector3( ( clientX / viewSize.width ) * 2 - 1, - ( clientY / viewSize.height ) * 2 + 1, 0.5 );
	vector.unproject( camera );

	var raycaster = feng.utils.ThreeUtils.raycaster;
	raycaster.set( position, vector.sub( position ).normalize() );

	var intersects = raycaster.intersectObjects( objects, recursive );

	return intersects;
};


feng.utils.ThreeUtils.isFirstIntersectedObject = function( allObjects, object, proxyBox, raycaster ) {

	var _allObjects = allObjects.concat();

	goog.array.remove( _allObjects, object );

	if(proxyBox) {

		_allObjects.push( proxyBox );
	}

	var intersects = raycaster.intersectObjects( _allObjects );

	if(intersects.length > 0) {

		if(proxyBox) {

			return (intersects[0].object === proxyBox && proxyBox.view3dObject.object3d === object);

		}else {

			return (intersects[0].object === object);
		}

	}else {

		return false;
	}
};


feng.utils.ThreeUtils.getQuaternionByLookAt = function( vecFrom, vecTo, vecUp ) {

	var vecUp = vecUp || new THREE.Vector3(0, 1, 0);

	var mtx4 = new THREE.Matrix4();
	mtx4.lookAt( vecFrom, vecTo, vecUp );

	var elements = mtx4.elements;

	var m00 = elements[0], m10 = elements[1], m20 = elements[2],
	m01 = elements[4], m11 = elements[5], m21 = elements[6],
	m02 = elements[8], m12 = elements[9], m22 = elements[10];

	var t = m00 + m11 + m22,s,x,y,z,w;

	if (t > 0) { 
	  s =  Math.sqrt(t+1)*2; 
	  w = 0.25 * s;            
	  x = (m21 - m12) / s;
	  y = (m02 - m20) / s;
	  z = (m10 - m01) / s;
	} else if ((m00 > m11) && (m00 > m22)) {
	  s =  Math.sqrt(1.0 + m00 - m11 - m22)*2;
	  x = s * 0.25;
	  y = (m10 + m01) / s;
	  z = (m02 + m20) / s;
	  w = (m21 - m12) / s;
	} else if (m11 > m22) {
	  s =  Math.sqrt(1.0 + m11 - m00 - m22) *2; 
	  y = s * 0.25;
	  x = (m10 + m01) / s;
	  z = (m21 + m12) / s;
	  w = (m02 - m20) / s;
	} else {
	  s =  Math.sqrt(1.0 + m22 - m00 - m11) *2; 
	  z = s * 0.25;
	  x = (m02 + m20) / s;
	  y = (m21 + m12) / s;
	  w = (m10 - m01) / s;
	}

	var rotation = new THREE.Quaternion(x,y,z,w);
	rotation.normalize();
	return rotation;
};


feng.utils.ThreeUtils.get2DCoordinates = function( position, camera, renderElementSize ) {

	// this will give us position relative to the world
	// project will translate position to 2d
	var p = position.clone().project( camera );

	// translate our vector so that percX=0 represents
	// the left edge, percX=1 is the right edge,
	// percY=0 is the top edge, and percY=1 is the bottom edge.
	var percX = (p.x + 1) / 2;
	var percY = (-p.y + 1) / 2;

	// scale these values to our viewport size
	var x = percX * renderElementSize.width;
	var y = percY * renderElementSize.height;

	return {x: x, y: y};
};


feng.utils.ThreeUtils.getShortestRotation = function( from, to ) {
	// use shortest rotation, based on the TweenMax AS3 shortrotation...
	var calculate = function(fromVal, toVal) {
		var cap = Math.PI * 2;
		var diff = (toVal - fromVal) % cap;

		if (diff != diff % (cap / 2)) {
			diff = (diff < 0) ? diff + cap : diff - cap;
		}

		var shortest = fromVal + diff;

		return shortest;
	}

	if(from instanceof THREE.Euler && to instanceof THREE.Euler) {

		to.x = calculate(from.x, to.x);
		to.y = calculate(from.y, to.y);
		to.z = calculate(from.z, to.z);
		
	}else {

		to = calculate(from, to);
	}

	return to;
};


feng.utils.ThreeUtils.getLerpedEuler = function( a, b, x, opt_euler ) {

	var euler = opt_euler || a.clone();

	var qa = (new THREE.Quaternion()).setFromEuler( a );
	var qb = (new THREE.Quaternion()).setFromEuler( b );
	var qr = qa.slerp( qb, x );

	return euler.setFromQuaternion( qr );
};


feng.utils.ThreeUtils.getWorldPositionOfLocal = function( object, position, opt_pos ) {

	var localPos = opt_pos || new THREE.Vector3();
	localPos.copy( position );

	return object.localToWorld( localPos );
};


feng.utils.ThreeUtils.getLocalPositionOfWorld = function( object, position, opt_pos ) {

	var worldPos = opt_pos || new THREE.Vector3();
	worldPos.copy( position );

	return object.worldToLocal( worldPos );
};


feng.utils.ThreeUtils.getWorldRotationOfLocal = function( object, rotation, opt_rot ) {

  var localQuaternion = (new THREE.Quaternion()).setFromEuler( rotation );
  var objectQuaternion = (new THREE.Quaternion()).setFromEuler( object.rotation );

  var worldQuaternion = objectQuaternion.multiply( localQuaternion );
  var worldRotation = (opt_rot || new THREE.Euler()).setFromQuaternion( worldQuaternion );

  return worldRotation;
};


feng.utils.ThreeUtils.getLocalRotationOfWorld = function( object, rotation, opt_rot ) {

  var worldQuaternion = (new THREE.Quaternion()).setFromEuler( rotation );
  var objectQuaternion = (new THREE.Quaternion()).setFromEuler( object.rotation );

  var localQuaternion = worldQuaternion.multiply( objectQuaternion );
  var localRotation = (opt_rot || new THREE.Euler()).setFromQuaternion( localQuaternion );

  return localRotation;
};


feng.utils.ThreeUtils.projector = new THREE.Projector();
feng.utils.ThreeUtils.raycaster = new THREE.Raycaster();
feng.utils.ThreeUtils.loader = new THREE.ObjectLoader();
